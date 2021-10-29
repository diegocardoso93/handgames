import React, { useEffect, useState } from 'react';
import { Container, Circle, Hand } from './styled';

export default function Guessthefinger() {
  function isWalletConnected() {
    return false;
  }

  function onChoose(option: number) {
    console.log(option);
  }

  return (
    <Container>
      <h1>Rock, paper, scissor</h1>
      <div>
        <Hand src="/img/hand.png" />

        {/* <Circle onClick={() => onChoose(1)} ml={-138} mt={74}></Circle>
        <Circle onClick={() => onChoose(2)} ml={-66} mt={42}></Circle>
        <Circle onClick={() => onChoose(3)} ml={30} mt={42}></Circle>
        <Circle onClick={() => onChoose(4)} ml={73} mt={176}></Circle> */}
      </div>
    </Container>
  );
}
