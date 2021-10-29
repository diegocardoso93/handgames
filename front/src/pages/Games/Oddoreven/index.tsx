import React, { ReactElement, useState } from 'react';
import useWalletConnect from '../../../hooks/useWalletConnect';
import InputBet from '../Common/InputBet';
import WalletLoading from '../Common/WalletLoading';
import { Container, Option, Button } from './styled';

export default function Oddoreven(): ReactElement {
  const { walletState, signTxnScenario, pendingRequest } = useWalletConnect();
  const { result, connected, pendingSubmissions } = walletState;
  const [select, setSelected] = useState('');
  const [createRoomCalled, setCreateRoomCalled] = useState(false);
  const [guessedOption, setGuessedOption] = useState('');

  return (
    <Container>
      {(!createRoomCalled && (
        <>
          <p>select an hand-option and odd or even option</p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-evenly',
              maxWidth: '360px',
            }}
          >
            <Option active={select === 'h0'} onClick={() => setSelected('h0')}>
              <img src="/img/h0.png" style={{ width: 60, paddingTop: 16 }} />
              <p>0</p>
            </Option>
            <Option active={select === 'h1'} onClick={() => setSelected('h1')}>
              <img src="/img/h1.png" style={{ height: 87, paddingTop: 6 }} />
              <p>1</p>
            </Option>
            <Option active={select === 'h2'} onClick={() => setSelected('h2')}>
              <img src="/img/h2.png" style={{ height: 87, paddingTop: 6 }} />
              <p>2</p>
            </Option>
            <Option active={select === 'h3'} onClick={() => setSelected('h3')}>
              <img src="/img/h3.png" style={{ height: 87, paddingTop: 6 }} />
              <p>3</p>
            </Option>
            <Option active={select === 'h4'} onClick={() => setSelected('h4')}>
              <img src="/img/h4.png" style={{ height: 87, paddingTop: 6 }} />
              <p>4</p>
            </Option>
            <Option active={select === 'h5'} onClick={() => setSelected('h5')}>
              <img src="/img/h5.png" style={{ height: 87, paddingTop: 6 }} />
              <p>5</p>
            </Option>
          </div>
          <Button
            active={guessedOption === 'odd'}
            onClick={() => setGuessedOption('odd')}
          >
            Odd
          </Button>
          <Button
            active={guessedOption === 'even'}
            onClick={() => setGuessedOption('even')}
          >
            Even
          </Button>
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
