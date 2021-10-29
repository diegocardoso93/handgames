import React, { ReactElement, useState } from 'react';
import useWalletConnect from '../../../hooks/useWalletConnect';
import InputBet from '../Common/InputBet';
import WalletLoading from '../Common/WalletLoading';
import { Container, Option } from './styled';

export default function GuessTheFinger(): ReactElement {
  const { walletState, signTxnScenario, pendingRequest } = useWalletConnect();
  const { result, connected, pendingSubmissions } = walletState;
  const [select, setSelected] = useState('');
  const [createRoomCalled, setCreateRoomCalled] = useState(false);

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
          <InputBet
            signTxnScenario={signTxnScenario}
            setCreateRoomCalled={setCreateRoomCalled}
            connected={connected}
          />
        </>
      )) || (
        <WalletLoading
          result={result}
          pendingSubmissions={pendingSubmissions}
          createRoomCalled={createRoomCalled}
          pendingRequest={pendingRequest}
        />
      )}
    </Container>
  );
}
