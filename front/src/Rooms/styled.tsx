import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const GamesContainer = styled.div`
  max-width: 360px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
`;

export const Card = styled.div`
  width: calc(50% - 32px);
  background: #fff;
  border-radius: 2px;
  display: inline-block;
  margin: 1rem;
  position: relative;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 2px 4px rgba(0, 0, 0, 0.23);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  text-decoration: none;
  margin-top: 6px;
  cursor: pointer;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 120px;
  }

  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 6px 6px rgba(0, 0, 0, 0.22);
  }

  p {
    font-size: 14px;
    margin-top: 6px;
    margin-bottom: 12px;
    color: black;
  }

  img {
    max-width: 120px;
    max-height: 100px;
    margin-top: 10px;
  }
`;

export const Table = styled.div`
  margin-top: 20px;
`;

export const THeader = styled.div`
  border: 2px solid #000;
  border-left: 0;
  border-right: 0;
  background: #fafafa;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px 0;
`;

export const TBody = styled.div``;

export const TRow = styled.div`
  border-bottom: 1px solid #000;
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
`;

export const Modal = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 60px;
  left: 0;
  background: white;
`;

export const MContent = styled.div`
  margin: auto;
  width: 100%;
  max-width: 500px;
`;

export const MHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px;
  align-items: center;
`;

export const Close = styled.div`
  padding: 10px;
  font-size: 40px;
  cursor: pointer;
`;

export const MBody = styled.div``;
