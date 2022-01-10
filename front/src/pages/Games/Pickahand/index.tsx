import React, { ReactElement, useState } from 'react';
import { apiRegisterGame } from 'src/helpers/api';
import useMyAlgo from 'src/hooks/useMyAlgo';
import useWalletConnect from '../../../hooks/useWalletConnect';
import InputBet from '../Common/InputBet';
import WalletLoading from '../Common/WalletLoading';
import { Container, Option } from './styled';

export default function Pickahand(): ReactElement {
  const { walletState, signTxnScenario, pendingRequest } = useWalletConnect();
  const { result, connected, pendingSubmissions } = walletState;
  const [select, setSelected] = useState('');
  const [createRoomCalled, setCreateRoomCalled] = useState(false);
  const myAlgo = useMyAlgo();

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
            // setCreateRoomCalled={setCreateRoomCalled}
            setCreateRoomCalled={async () => {
              setCreateRoomCalled(true);
              const inp = document.querySelector('#bet') as HTMLInputElement;
              const txId = await myAlgo.makeTransaction(
                (inp && inp?.value) || '0'
              );
              const wallet = myAlgo.getAccount();
              await apiRegisterGame(txId, wallet, 'pickahand');
            }}
            connected={connected || myAlgo.myAlgoConnected()}
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
