import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Button = styled.button`
  margin-top: 36px;
  background: black;
  color: white;

  &:hover {
    color: yellow;
  }
`;

type CardProps = {
  visible: boolean;
};

export const Card = styled.div`
  transition: opacity 0.7s ease-out;
  display: block;
  opacity: 0;
  margin: 1rem;

  ${({ visible }: CardProps) => (visible ? `opacity: 1;` : '')};
  margin-top: -175px;

  width: 100%;
  background: #fff;
  border-radius: 2px;
  position: relative;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 2px 4px rgba(0, 0, 0, 0.23);
  text-decoration: none;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 120px;
  }

  p {
    font-size: 14px;
    margin-top: 6px;
    color: black;
    padding-bottom: 12px;
  }

  img {
    max-width: 120px;
    max-height: 100px;
    margin-top: 10px;
  }
`;
