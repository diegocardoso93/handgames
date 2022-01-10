import React, { createRef, ReactElement } from 'react';
import { Scenario, singlePayTxn } from '../../../helpers/scenarios';

type InputBetProps = {
  signTxnScenario: (scenario: Scenario, amount: number) => void;
  setCreateRoomCalled: (state: boolean) => void;
  connected: boolean;
};

export default function InputBet({
  signTxnScenario,
  setCreateRoomCalled,
  connected,
}: InputBetProps): ReactElement {
  const amountRef = createRef<HTMLInputElement>();

  async function createRoom() {
    if (!connected) {
      alert('first connect to your wallet');
      return;
    }

    signTxnScenario(singlePayTxn, parseFloat(amountRef.current?.value || '1'));
    setCreateRoomCalled(true);
  }

  return (
    <div style={{ marginTop: 20 }}>
      Bet:{' '}
      <input
        id="bet"
        ref={amountRef}
        type="number"
        defaultValue="1"
        min="0"
        style={{ height: 30, width: 60 }}
      />{' '}
      ALGO
      <br />
      <button style={{ marginTop: 30 }} onClick={() => createRoom()}>
        create
      </button>
    </div>
  );
}
