import React, { ReactElement, useEffect, useState } from 'react';
import Guessthefinger from '../Games/Guessthefinger';
import Oddoreven from '../Games/Oddoreven';
import Pickahand from '../Games/Pickahand';
import Rockpaperscissor from '../Games/Rockpaperscissor';
import {
  GamesContainer,
  Card,
  Table,
  THeader,
  TBody,
  TRow,
  Modal,
  MContent,
  MHeader,
  MBody,
  Close,
} from './styled';

export default function Rooms(): ReactElement {
  const [showModal, setShowModal] = useState(false);
  const [selectedGame, setSelectedGame] = useState<string>();
  const [modalTitle, setModalTitle] = useState('Pick a game');

  useEffect(() => {
    // fetch
  }, []);

  return (
    <div>
      <h1
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginLeft: '10px',
        }}
      >
        Rooms <button onClick={() => setShowModal(true)}>+ new room</button>
      </h1>
      <Table>
        <THeader>
          <div>Player</div>
          <div>Game</div>
          <div>Bet</div>
          <div></div>
        </THeader>
        <TBody>
          <TRow>
            <div>UNH3...BH3M</div>
            <div>Odd or even</div>
            <div>1 Algo</div>
            <div style={{ marginLeft: '-18px' }}>
              <button>play</button>
            </div>
          </TRow>
        </TBody>
      </Table>
      {showModal && (
        <Modal>
          <MContent>
            <MHeader>
              <h3>{modalTitle}</h3>
              <Close
                onClick={() => {
                  setShowModal(false);
                  setSelectedGame('');
                  setModalTitle('Pick a game');
                }}
              >
                &times;
              </Close>
            </MHeader>
            <MBody>
              {(!selectedGame && (
                <GamesContainer>
                  <Card
                    onClick={() => {
                      setSelectedGame('rockpaperscissor');
                      setModalTitle('Rock, paper, scissor');
                    }}
                  >
                    <div>
                      <img src="/img/rockpaperscissor.png" />
                    </div>
                    <p>Rock, paper, scissor</p>
                  </Card>
                  <Card
                    onClick={() => {
                      setSelectedGame('oddoreven');
                      setModalTitle('Odd or even');
                    }}
                  >
                    <div>
                      <img src="/img/oddeven.png" />
                    </div>
                    <p>Odd or even</p>
                  </Card>
                  <Card
                    onClick={() => {
                      setSelectedGame('pickahand');
                      setModalTitle('Pick a hand');
                    }}
                  >
                    <div>
                      <img src="/img/pickahand.png" />
                    </div>
                    <p>Pick a hand</p>
                  </Card>
                  <Card
                    onClick={() => {
                      setSelectedGame('guessthefinger');
                      setModalTitle('Guess the finger');
                    }}
                  >
                    <div>
                      <img src="/img/guessthefinger.png" />
                    </div>
                    <p>Guess the finger</p>
                  </Card>
                </GamesContainer>
              )) || (
                <div>
                  {(selectedGame === 'guessthefinger' && <Guessthefinger />) ||
                    ''}
                  {(selectedGame === 'rockpaperscissor' && (
                    <Rockpaperscissor />
                  )) ||
                    ''}
                  {(selectedGame === 'oddoreven' && <Oddoreven />) || ''}
                  {(selectedGame === 'pickahand' && <Pickahand />) || ''}
                </div>
              )}
            </MBody>
          </MContent>
        </Modal>
      )}
    </div>
  );
}
