import styled from 'styled-components';

type CircleProps = {
  active: boolean;
  disabled: boolean;
  ml?: number;
  mt?: number;
};

export const Container = styled.div`
  width: 360px;
  margin: auto;
`;

export const Circle = styled.button`
  ${({ active }: CircleProps) => active && `background: red;`}

  border: 2px solid #ccc;
  border-radius: 100%;
  width: 36px;
  height: 36px;
  position: absolute;
  margin-left: ${({ ml }) => ml}px;
  margin-top: ${({ mt }) => mt}px;

  ${({ disabled }) =>
    !disabled &&
    `
    @media (hover: hover) {
      &:hover {
        filter: brightness(0.6);
        cursor: pointer;
        outline: none;
      }
    }
  `}
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
  width: 100%;
  outline: 0;
  box-sizing: border-box;

  &:hover {
    border: 3px solid #613ab7;
  }

  p {
    margin: 0;
  }

  ${({ active }: { active: boolean }) => active && `border: 3px solid #613ab7;`}
`;
