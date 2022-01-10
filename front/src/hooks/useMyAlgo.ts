import MyAlgoConnect, { Accounts } from '@randlabs/myalgo-connect';
import { useState } from 'react';

import { ChainType, waitForTransaction } from '../helpers/api';

type ReturnAttrs = {
  myAlgoConnect: MyAlgoConnect;
  connect: () => void;
  accounts: Accounts[] | any;
  makeTransaction: (amount: string) => Promise<string>;
  myAlgoConnected: () => boolean;
  getAccount: () => string;
};

import algosdk from 'algosdk';

const algodClient = new algosdk.Algodv2(
  '',
  'https://api.testnet.algoexplorer.io',
  ''
);

export default function useMyAlgo(): ReturnAttrs {
  const myAlgoConnect = new MyAlgoConnect();
  const [accounts, setAccounts] = useState<Accounts[]>();

  async function connect() {
    const accs = await myAlgoConnect.connect({
      shouldSelectOneAccount: true,
    });

    setAccounts(accs);
    localStorage.setItem('myAlgo', JSON.stringify(accs));

    return accs;
  }

  function getAccount() {
    const accs = JSON.parse(localStorage.getItem('myAlgo') || '{}');
    return (accs && accs[0].address) || '';
  }

  async function makeTransaction(amount: string) {
    const params = await algodClient.getTransactionParams().do();

    const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      suggestedParams: {
        ...params,
      },
      from: getAccount(),
      to: 'J457CEELJUCRWTRB7I5E464O22XFRK7B2F57XBKJ6U3XR47CKWOUA6ZQAM',
      amount: parseInt(amount) * 10 ** 6,
    });

    const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());
    console.log('signedTxn', signedTxn);

    const res = await algodClient.sendRawTransaction(signedTxn.blob).do();
    console.log('txId', res.txId);

    await waitForTransaction(ChainType.TestNet, res.txId);
    return res.txId;
  }

  function myAlgoConnected() {
    const myAlgo = localStorage.getItem('myAlgo');
    return JSON.parse(myAlgo === 'undefined' ? 'null' : myAlgo || 'null');
  }

  return {
    myAlgoConnect,
    connect,
    accounts,
    makeTransaction,
    myAlgoConnected,
    getAccount,
  };
}
