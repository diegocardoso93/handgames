import styled from 'styled-components';

export const SHeader = styled.div`
  margin-top: -1px;
  margin-bottom: 1px;
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
`;

export const SActiveAccount = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  font-weight: 500;
  cursor: pointer;
  padding-right: 16px;
`;

interface IHeaderStyle {
  connected: boolean;
}

export const SAddress = styled.p<IHeaderStyle>`
  font-weight: bold;
  margin: 0;
`;

export const SDisconnect = styled.div<IHeaderStyle>`
  font-size: 12px;
  font-family: monospace;
  position: absolute;
  right: 0;
  top: 20px;
  opacity: 0.7;
  cursor: pointer;

  opacity: ${({ connected }) => (connected ? 1 : 0)};
  visibility: ${({ connected }) => (connected ? 'visible' : 'hidden')};
  pointer-events: ${({ connected }) => (connected ? 'auto' : 'none')};

  &:hover {
    transform: translateY(-1px);
    opacity: 0.5;
  }
`;

export const Menu = styled.div`
  position: absolute;
  height: 92px;
  width: 100px;
  background: white;
  position: absolute;
  height: 147px;
  width: 200px;
  top: 0;
  padding: 16px;

  @media (max-width: 800px) {
    right: 0;
  }
  @media (min-width: 800px) {
    left: calc(100vw - 400px);
  }
`;

export const MenuItem = styled.div`
  cursor: pointer;
  width: 100%;
  padding: 8px 0;
  border-top: 1px solid #000;

  &:hover {
    background: #fafafa;
  }
`;

export const MenuTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const MenuClose = styled.div`
  font-size: 24px;
  cursor: pointer;
`;
