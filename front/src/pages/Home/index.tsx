import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { cursorTo } from 'readline';
import { Container, Button, Card } from './styled';

export default function Home() {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setVisible((v) => (v < 3 ? v + 1 : 0));
    }, 1500);
  }, []);

  return (
    <>
      <Container>
        <div>
          <h2 style={{ margin: '58px 12px' }}>
            Bet Algo and earn x2 on a hand game
          </h2>
          <h3>
            One win$, the other l∅ses.
            <br />
            <small>Where do you fit in?</small>
            <br />
          </h3>
        </div>

        <div style={{ width: '186px', paddingRight: '30px', margin: 'auto' }}>
          <div style={{ height: 176, marginTop: '30px' }}></div>

          <Card visible={visible === 0}>
            <div>
              <img src="/img/rockpaperscissor.png" />
            </div>
            <p>Rock, paper, scissor</p>
          </Card>
          <Card visible={visible === 1}>
            <div>
              <img src="/img/oddeven.png" />
            </div>
            <p>Odd or even</p>
          </Card>
          <Card visible={visible === 2}>
            <div>
              <img src="/img/pickahand.png" />
            </div>
            <p>Pick a hand</p>
          </Card>
          <Card visible={visible === 3}>
            <div>
              <img src="/img/guessthefinger.png" />
            </div>
            <p>Guess the finger</p>
          </Card>
        </div>
      </Container>

      <Link to="/rooms">
        <Button>Let`s play now!</Button>
      </Link>

      {/* 
      <div
        style={{
          fontSize: 13,
          fontWeight: 'normal',
          margin: '10px 20px',
        }}
      >
        You just need to select a game to play, create a room and wait for an
        opponent, or enter on some active room.
      </div> */}
    </>
  );
}
