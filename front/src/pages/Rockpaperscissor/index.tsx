import React, { useEffect, useState } from 'react';
import { Container, Circle, Hand } from './styled';

type PlayerStats = {
  [id: string]: { wins: number; loses: number };
};

interface GameState {
  phase: 'create' | 'wait' | 'init' | 'start' | 'end' | 'finish';
  host: string;
  turn: string;
  players: PlayerStats;
  sequence: number[];
  times: number[];
  round: number;
  bet: number;
}

let myId = 'asd';
const ROUNDS = 3;

export default function Rockpaperscissor() {
  const [gameState, setGameState] = useState<GameState>({
    phase: 'create',
    host: 'asd',
    turn: 'asd',
    players: {
      asd: { wins: 0, loses: 0 },
      bsd: { wins: 0, loses: 0 },
    },
    sequence: [],
    times: [],
    round: 1,
    bet: 0,
  });
  const [target, setTarget] = useState(0);
  const [counter, setCounter] = useState(-5000);
  let interval: NodeJS.Timeout;

  useEffect(() => {
    const { phase, turn } = gameState;
    if (phase === 'start' && turn === myId) {
      interval = setInterval(() => {
        setCounter((c) => {
          if (c === 0) {
            setTarget(4);
          }
          return c + 50;
        });
      }, 50);
    }

    return () => {
      clearInterval(interval);
    };
  }, [gameState]);

  const { phase, turn, sequence } = gameState;

  const onChoose = (circle: number) => {
    if (phase === 'init' && turn === myId) {
      sequence.push(circle);
      setGameState({ ...gameState });
      if (sequence.length === 6) {
        setGameState({
          ...gameState,
          phase: 'start',
          turn: Object.keys(gameState.players).find((p) => p !== myId) || '',
        });
        myId = myId == 'bsd' ? 'asd' : 'bsd';
      }
    } else if (phase === 'start' && circle === target) {
      if (target !== 4) {
        setTarget(4);
      } else {
        const x = sequence.shift();
        setTarget(x || 0);
        if (!x) {
          setGameState({ ...gameState, phase: 'end' });
          setTimeout(() => {
            setGameState({ ...gameState, phase: 'init' });
            setCounter(0);
          }, 4000);
        }
      }
    }
  };
  console.log(sequence);

  function isWalletConnected() {
    return false;
  }

  return (
    <Container>
      <h1>Rock, paper, scissor</h1>
      {(phase === 'create' && (
        <div style={{ textAlign: 'left', padding: '0 20px', fontSize: '14px' }}>
          please wait for a player to connect...
          <br />
        </div>
      )) ||
        (phase === 'wait' &&
          (!isWalletConnected() || <div>deposit ,amount, ALGs</div>) && (
            <div>Please connect to your wallet</div>
          )) ||
        (turn === myId && <h2>Your turn</h2>) || (
          <h2>Your oponent is playing...</h2>
        )}
      {(phase === 'init' && (
        <div>
          <p>
            choose the sequence by clicking on the below circles between the
            fingers {(sequence.length && '[' + sequence.join(',') + ']') || ''}
          </p>
        </div>
      )) ||
        (phase === 'init' && counter < 0 && (
          <h2>Attention... {-Math.floor(counter / 1000)}</h2>
        )) ||
        (phase === 'end' && <p>finished in {counter / 1000} seconds</p>) ||
        (phase === 'start' && <p>click on the red circle fast as you can</p>)}

      {(phase === 'init' || phase == 'start') && (
        <div>
          <Hand src="/img/hand.png" />

          <Circle
            disabled={turn !== myId}
            active={phase !== 'init' && target === 1}
            onClick={() => onChoose(1)}
            ml={-138}
            mt={74}
          ></Circle>
          <Circle
            disabled={turn !== myId}
            active={phase !== 'init' && target === 2}
            onClick={() => onChoose(2)}
            ml={-66}
            mt={42}
          ></Circle>
          <Circle
            disabled={turn !== myId}
            active={phase !== 'init' && target === 3}
            onClick={() => onChoose(3)}
            ml={30}
            mt={42}
          ></Circle>
          <Circle
            disabled={turn !== myId}
            active={phase !== 'init' && target === 4}
            onClick={() => phase !== 'init' && onChoose(4)}
            ml={73}
            mt={176}
          ></Circle>
        </div>
      )}
    </Container>
  );
}
