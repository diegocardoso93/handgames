import React, { ReactElement, useState } from 'react';
import { apiRegisterGame } from 'src/helpers/api';
import useMyAlgo from 'src/hooks/useMyAlgo';
import useWalletConnect from '../../../hooks/useWalletConnect';
import InputBet from '../Common/InputBet';
import WalletLoading from '../Common/WalletLoading';
import { Circle, Container, Option } from './styled';

export default function GuessTheFinger(): ReactElement {
  const { walletState, signTxnScenario, pendingRequest } = useWalletConnect();
  const { result, connected, pendingSubmissions } = walletState;
  const [select, setSelected] = useState('');
  const [createRoomCalled, setCreateRoomCalled] = useState(false);
  const myAlgo = useMyAlgo();

  return (
    <Container>
      {(!createRoomCalled && (
        <>
          <small>
            if creator wins 20%, if loses 80%, if second player wins 80%, if
            loses 20%
          </small>
          <p>select a finger</p>
          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
            }}
          >
            <img src="/img/hand.png" style={{ width: 200 }} />
            <Circle
              ml={-217}
              mt={52}
              active={select === 'f1'}
              onClick={() => setSelected('f1')}
            />
            <Circle
              ml={-27}
              mt={12}
              active={select === 'f2'}
              onClick={() => setSelected('f2')}
            />
            <Circle
              ml={-4}
              mt={-12}
              active={select === 'f3'}
              onClick={() => setSelected('f3')}
            />
            <Circle
              ml={-7}
              mt={12}
              active={select === 'f4'}
              onClick={() => setSelected('f4')}
            />
            <Circle
              ml={-30}
              mt={110}
              active={select === 'f5'}
              onClick={() => setSelected('f5')}
            />
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
              await apiRegisterGame(txId, wallet, 'guessthefinger');
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
