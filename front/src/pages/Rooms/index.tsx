import React, { useEffect, useState } from 'react';
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

export default function Rooms() {
  const [showModal, setShowModal] = useState(false);
  const [selectedGame, setSelectedGame] = useState<string>();

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
              <button>start</button>
            </div>
          </TRow>
        </TBody>
      </Table>
      {showModal && (
        <Modal>
          <MContent>
            <MHeader>
              <h3>Pick a game</h3>
              <Close
                onClick={() => {
                  setShowModal(false);
                  setSelectedGame('');
                }}
              >
                &times;
              </Close>
            </MHeader>
            <MBody>
              {(!selectedGame && (
                <GamesContainer>
                  <Card onClick={() => setSelectedGame('rockpaperscissor')}>
                    <div>
                      <img src="/img/rockpaperscissor.png" />
                    </div>
                    <p>Rock, paper, scissor</p>
                  </Card>
                  <Card onClick={() => setSelectedGame('oddoreven')}>
                    <div>
                      <img src="/img/oddeven.png" />
                    </div>
                    <p>Odd or even</p>
                  </Card>
                  <Card onClick={() => setSelectedGame('pickahand')}>
                    <div>
                      <img src="/img/pickahand.png" />
                    </div>
                    <p>Pick a hand</p>
                  </Card>
                  <Card onClick={() => setSelectedGame('guessthefinger')}>
                    <div>
                      <img src="/img/guessthefinger.png" />
                    </div>
                    <p>Guess the finger</p>
                  </Card>
                </GamesContainer>
              )) || (
                <div>
                  bet: 1 ALGO
                  <br />
                  <button>create</button>
                </div>
              )}
            </MBody>
          </MContent>
        </Modal>
      )}
    </div>
  );
}
