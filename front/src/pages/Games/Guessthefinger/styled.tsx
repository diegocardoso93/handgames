import styled from 'styled-components';

type CircleProps = {
  active: boolean;
  ml?: number;
  mt?: number;
};

export const Container = styled.div`
  max-width: 360px;
  margin: auto;
  @media (max-width: 900px) {
    height: 73vh;
    overflow-y: scroll;
  }
`;

export const Circle = styled.button`
  border: 2px solid #b5b5ff;
  border-radius: 100%;
  width: 52px;
  height: 36px;
  position: relative;
  background: none;
  margin-left: ${({ ml }) => ml}px;
  margin-top: ${({ mt }) => mt}px;

  @media (hover: hover) {
    &:hover {
      filter: brightness(0.6);
      cursor: pointer;
      outline: none;
    }
  }

  ${({ active }: CircleProps) => active && `background: #b5b5ff;`}
`;

export const Hand = styled.img`
  position: absolute;
  width: 320px;
  margin-left: -160px;
`;

export const Option = styled.div`
  border: 2px solid #000;
  cursor: pointer;
  padding: 6px;
  margin: 4px;
  width: 112px;
  outline: 0;
  box-sizing: border-box;

  &:hover {
    border: 2px solid #613ab7;
    background: #613ab709;
  }

  p {
    margin: 0;
  }

  ${({ active }: { active: boolean }) =>
    active && `border: 2px solid #613ab7;background: #613ab709;`}
`;
