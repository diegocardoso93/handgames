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
