import { formatJsonRpcRequest } from '@json-rpc-tools/utils';
import WalletConnect from '@walletconnect/client';
import QRCodeModal from 'algorand-walletconnect-qrcode-modal';
import { IInternalEvent } from '@walletconnect/types';
import algosdk from 'algosdk';
import { useEffect, useState } from 'react';
import {
  apiGetAccountAssets,
  apiSubmitTransactions,
  ChainType,
} from '../helpers/api';
import {
  IResult,
  IWalletState,
  WALLET_INITIAL_STATE,
} from '../helpers/apptypes';
import { IWalletTransaction, SignTxnParams } from '../helpers/types';
import { Scenario, signTxnWithTestAccount } from '../helpers/scenarios';

type ReturnAttrs = {
  walletConnectInit: () => void;
  killSession: () => void;
  chainUpdate: (newChain: ChainType) => void;
  signTxnScenario: (scenario: Scenario, amount: number) => void;
  submitSignedTransaction: (walletState: IWalletState) => void;
  walletState: IWalletState;
  pendingRequest: boolean;
};

export default function useWalletConnect(): ReturnAttrs {
  const [walletState, setWalletState] = useState(WALLET_INITIAL_STATE);
  const [pendingRequest, setPendingRequest] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('walletconnect')) {
      walletConnectInit();
    }
  }, []);

  useEffect(() => {
    if (walletState.connector?.connected) {
      const chain = localStorage.getItem('selectedChain') as ChainType;
      if (chain) {
        chainUpdate(chain);
      }
    }
  }, [walletState.connector]);

  const walletConnectInit = async () => {
    // bridge url
    const bridge = 'https://bridge.walletconnect.org';

    // create new connector
    const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });

    setWalletState({ ...walletState, connector });

    // check if already connected
    if (!connector.connected) {
      // create new session
      await connector.createSession();
    }

    // subscribe to events
    await subscribeToEvents(connector);
  };

  const subscribeToEvents = (connector: WalletConnect) => {
    if (!connector) {
      return;
    }

    connector.on('session_update', async (error, payload) => {
      console.log(`connector.on("session_update")`);

      if (error) {
        throw error;
      }

      const { accounts } = payload.params[0];
      onSessionUpdate(walletState, accounts);
    });

    connector.on('connect', (error, payload) => {
      console.log(`connector.on("connect")`);

      if (error) {
        throw error;
      }

      onConnect(payload);
    });

    connector.on('disconnect', (error, payload) => {
      console.log(`connector.on("disconnect")`);

      if (error) {
        throw error;
      }

      onDisconnect();
    });

    if (connector.connected) {
      const { accounts } = connector;

      const address = accounts[0];
      const newState = {
        ...walletState,
        connected: true,
        accounts,
        address,
        connector,
      };
      setWalletState(newState);
      onSessionUpdate(newState, accounts);
      return;
    }

    setWalletState({ ...walletState, connector });
  };

  const killSession = async () => {
    const { connector } = walletState;
    if (connector) {
      connector.killSession();
    }
    resetApp();
  };

  const chainUpdate = (newChain: ChainType) => {
    const newState = { ...walletState, chain: newChain };
    localStorage.setItem('selectedChain', newChain);
    setWalletState(newState);
    getAccountAssets(newState);
  };

  const resetApp = async () => {
    await setWalletState({ ...WALLET_INITIAL_STATE });
  };

  const onConnect = async (payload: IInternalEvent) => {
    console.log('onConnect', payload);
    const { accounts } = payload.params[0];
    const address = accounts[0];
    const newState = {
      ...walletState,
      connected: true,
      accounts,
      address,
    };
    setWalletState(newState);
    await getAccountAssets(newState);
  };

  const onDisconnect = async () => {
    resetApp();
  };

  const onSessionUpdate = async (
    walletState: IWalletState,
    accounts: string[]
  ) => {
    const address = accounts[0];
    const newState = { ...walletState, accounts, address };
    setWalletState(newState);
    await getAccountAssets(newState);
  };

  const getAccountAssets = async (walletState: IWalletState) => {
    console.log('walletState', walletState);
    const { address, chain } = walletState;
    setWalletState({ ...walletState, fetching: true });

    try {
      // get account balances
      const assets = await apiGetAccountAssets(chain, address);

      setWalletState({
        ...walletState,
        fetching: false,
        address,
        assets,
      });
    } catch (error) {
      console.error(error);
      setWalletState({ ...walletState, fetching: false });
    }
  };

  const signTxnScenario = async (scenario: Scenario, amount: number) => {
    const { connector, address, chain } = walletState;

    if (!connector) {
      return;
    }

    try {
      const txnsToSign = await scenario(chain, address, amount);
      // toggle pending request indicator
      setPendingRequest(true);

      const flatTxns = txnsToSign.reduce((acc, val) => acc.concat(val), []);

      const walletTxns: IWalletTransaction[] = flatTxns.map(
        ({ txn, signers, authAddr, message }) => ({
          txn: Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString(
            'base64'
          ),
          signers, // TODO: put auth addr in signers array
          authAddr,
          message,
        })
      );

      // sign transaction
      const requestParams: SignTxnParams = [walletTxns];
      const request = formatJsonRpcRequest('algo_signTxn', requestParams);
      const result: Array<string | null> = await connector.sendCustomRequest(
        request
      );

      console.log('Raw response:', result);

      const indexToGroup = (index: number) => {
        for (let group = 0; group < txnsToSign.length; group++) {
          const groupLength = txnsToSign[group].length;
          if (index < groupLength) {
            return [group, index];
          }

          index -= groupLength;
        }

        throw new Error(`Index too large for groups: ${index}`);
      };

      const signedPartialTxns: Array<Array<Uint8Array | null>> = txnsToSign.map(
        () => []
      );
      result.forEach((r, i) => {
        const [group, groupIndex] = indexToGroup(i);
        const toSign = txnsToSign[group][groupIndex];

        if (r == null) {
          if (toSign.signers !== undefined && toSign.signers?.length < 1) {
            signedPartialTxns[group].push(null);
            return;
          }
          throw new Error(
            `Transaction at index ${i}: was not signed when it should have been`
          );
        }

        if (toSign.signers !== undefined && toSign.signers?.length < 1) {
          throw new Error(
            `Transaction at index ${i} was signed when it should not have been`
          );
        }

        const rawSignedTxn = Buffer.from(r, 'base64');
        signedPartialTxns[group].push(new Uint8Array(rawSignedTxn));
      });

      const signedTxns: Uint8Array[][] = signedPartialTxns.map(
        (signedPartialTxnsInternal, group) => {
          return signedPartialTxnsInternal.map((stxn, groupIndex) => {
            if (stxn) {
              return stxn;
            }

            return signTxnWithTestAccount(txnsToSign[group][groupIndex].txn);
          });
        }
      );

      const signedTxnInfo: Array<
        Array<{
          txID: string;
          signingAddress?: string;
          signature: string;
        } | null>
      > = signedPartialTxns.map((signedPartialTxnsInternal, group) => {
        return signedPartialTxnsInternal.map((rawSignedTxn, i) => {
          if (rawSignedTxn == null) {
            return null;
          }

          const signedTxn = algosdk.decodeSignedTransaction(rawSignedTxn);
          const txn = signedTxn.txn;
          const txID = txn.txID();
          const unsignedTxID = txnsToSign[group][i].txn.txID();

          if (txID !== unsignedTxID) {
            throw new Error(
              `Signed transaction at index ${i} differs from unsigned transaction. Got ${txID}, expected ${unsignedTxID}`
            );
          }

          if (!signedTxn.sig) {
            throw new Error(
              `Signature not present on transaction at index ${i}`
            );
          }

          return {
            txID,
            signingAddress: signedTxn.sgnr
              ? algosdk.encodeAddress(signedTxn.sgnr)
              : undefined,
            signature: Buffer.from(signedTxn.sig).toString('base64'),
          };
        });
      });

      console.log('Signed txn info:', signedTxnInfo);

      // format displayed result
      const formattedResult: IResult = {
        method: 'algo_signTxn',
        body: signedTxnInfo,
      };

      // display result
      const newState = {
        ...walletState,
        connector,
        signedTxns,
        result: formattedResult,
      };
      setWalletState(newState);
      setPendingRequest(false);
      submitSignedTransaction(newState);
    } catch (error) {
      console.error(error);
      setWalletState({
        ...walletState,
        connector,
        result: 'rejected',
      });
      setPendingRequest(false);
    }
  };

  const submitSignedTransaction = async (walletState: IWalletState) => {
    const { signedTxns, chain } = walletState;
    if (signedTxns == null) {
      throw new Error('Transactions to submit are null');
    }

    setWalletState({
      ...walletState,
      pendingSubmissions: signedTxns.map(() => 0),
    });

    signedTxns.forEach(async (signedTxn, index) => {
      try {
        const confirmedRound = await apiSubmitTransactions(chain, signedTxn);

        setWalletState((prevState) => {
          return {
            ...walletState,
            pendingSubmissions: prevState.pendingSubmissions.map((v, i) => {
              if (index === i) {
                return confirmedRound;
              }
              return v;
            }),
          };
        });

        console.log(`Transaction confirmed at round ${confirmedRound}`);
      } catch (err) {
        setWalletState((prevState) => {
          return {
            ...walletState,
            pendingSubmissions: prevState.pendingSubmissions.map((v, i) => {
              if (index === i) {
                return <Error>err;
              }
              return v;
            }),
          };
        });

        console.error(`Error submitting transaction at index ${index}:`, err);
      }
    });
  };

  return {
    walletConnectInit,
    killSession,
    chainUpdate,
    signTxnScenario,
    submitSignedTransaction,
    walletState,
    pendingRequest,
  };
}
