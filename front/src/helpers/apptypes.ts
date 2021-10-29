import WalletConnect from '@walletconnect/client';
import { ChainType } from './api';
import { IAssetData } from './types';

export interface IResult {
  method: string;
  body: Array<
    Array<{
      txID: string;
      signingAddress?: string;
      signature: string;
    } | null>
  >;
}

export interface IWalletState {
  connector: WalletConnect | null;
  fetching: boolean;
  connected: boolean;
  showModal: boolean;
  signedTxns: Uint8Array[][] | null;
  pendingSubmissions: Array<number | Error>;
  uri: string;
  accounts: string[];
  address: string;
  result: IResult | null | string;
  chain: ChainType;
  assets: IAssetData[];
}

export const WALLET_INITIAL_STATE: IWalletState = {
  connector: null,
  fetching: false,
  connected: false,
  showModal: false,
  signedTxns: null,
  pendingSubmissions: [],
  uri: '',
  accounts: [],
  address: '',
  result: null,
  chain: ChainType.TestNet,
  assets: [],
};
