import styled from 'styled-components';

export const Container = styled.div`
  width: 360px;
  margin: auto;
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
