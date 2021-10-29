import React, { ReactElement, useState } from 'react';
import useWalletConnect from '../../../hooks/useWalletConnect';
import InputBet from '../Common/InputBet';
import WalletLoading from '../Common/WalletLoading';
import { Container, Option } from './styled';

export default function Pickahand(): ReactElement {
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
              active={select === 'left'}
              onClick={() => setSelected('left')}
            >
              <img src="/img/pickahand_x.png" style={{ width: 58 }} />
              <p>Left</p>
            </Option>
            <Option
              active={select === 'right'}
              onClick={() => setSelected('right')}
            >
              <img src="/img/pickahand_x.png" style={{ width: 58 }} />
              <p>Right</p>
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
