import React, { createRef, useEffect, useRef, useState } from 'react';
import Loader from '../../components/Loader';
import { singlePayTxn } from '../../helpers/scenarios';
import useWalletConnect from '../../hooks/useWalletConnect';
import { Container, Circle, Option } from './styled';

export default function Rockpaperscissor() {
  const { walletState, walletConnectInit, signTxnScenario, pendingRequest } =
    useWalletConnect();
  const { result, connected, chain, pendingSubmissions } = walletState;
  const [select, setSelected] = useState('');
  const [createRoomCalled, setCreateRoomCalled] = useState(false);
  const amountRef = createRef<HTMLInputElement>();

  function isWalletConnected() {
    return false;
  }

  function onChoose(option: number) {
    console.log(option);
  }

  async function createRoom() {
    walletConnectInit();
  }

  useEffect(() => {
    if (connected) {
      console.log('xsa', amountRef.current?.value);
      signTxnScenario(
        singlePayTxn,
        parseFloat(amountRef.current?.value || '1')
      );
      setCreateRoomCalled(true);
    }
  }, [connected]);
  console.log('connected', connected, pendingRequest);

  return (
    <Container>
      {(!createRoomCalled && (
        <>
          <p>select an hand-option</p>
          <div style={{ display: 'flex' }}>
            <Option
              active={select === 'rock'}
              onClick={() => setSelected('rock')}
            >
              <img src="/img/rock.png" style={{ width: 71 }} />
              <p>Rock</p>
            </Option>
            <Option
              active={select === 'paper'}
              onClick={() => setSelected('paper')}
            >
              <img src="/img/paper.png" style={{ width: 73 }} />
              <p>Paper</p>
            </Option>
            <Option
              active={select === 'scissor'}
              onClick={() => setSelected('scissor')}
            >
              <img src="/img/scissor.png" style={{ height: 81 }} />
              <p>Scissor</p>
            </Option>
          </div>
          <div style={{ marginTop: 20 }}>
            bet:{' '}
            <input
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
        </>
      )) ||
        (result === 'rejected' && (
          <div>
            <h2>Call Request Rejected</h2>
          </div>
        )) ||
        (result &&
          ((pendingSubmissions && (
            <>
              {pendingSubmissions.map((submissionInfo, index) => {
                // const prefix = `Txn Group ${index}: `;
                let content: string;

                if (submissionInfo === 0) {
                  content = 'Submitting...';
                } else if (typeof submissionInfo === 'number') {
                  // content = `Confirmed at round ${submissionInfo}`;
                  content =
                    'Your room has created! Wait for someone to play. You can view your openned rooms on menu (click wallet address) > rooms created.';
                } else {
                  content = 'Rejected by network.';
                }

                // return prefix + content;
                return content;
              })}
            </>
          )) ||
            'Your room has created! Wait for someone to play. You can view your openned rooms on menu > rooms created.')) ||
        (createRoomCalled && !pendingRequest && (
          <div>
            <h2>Connecting to wallet...</h2>
            <Loader />
          </div>
        )) ||
        (pendingRequest && (
          <div>
            <h2>Pending Call Request</h2>
            <Loader />
            <p>Approve or reject request using your wallet</p>
          </div>
        ))}
    </Container>
  );
}
