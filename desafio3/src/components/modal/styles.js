import styled, { css } from 'styled-components';

export const Container = styled.div`
  margin: 0;
  padding: 0;
  background-color: rgba(0, 0, 0, 0.9);
  width: 100vw;
  height: 100vh;
  position: absolute;

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;

  font-family: Roboto, 'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
    sans-serif;

  transform: scale(0);

  ${props => props.close
    && css`
      transform: scale(1);
      animation: unfoldOut 1s 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
    `}

  ${props => props.open
    && css`
      transform: scaleY(0.01) scaleX(0);
      animation: unfoldIn 1s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
    `}

  @keyframes unfoldIn {
    0% {
      transform: scaleY(0.005) scaleX(0);
    }
    50% {
      transform: scaleY(0.005) scaleX(1);
    }
    100% {
      transform: scaleY(1) scaleX(1);
    }
  }

  @keyframes unfoldOut {
    0% {
      transform: scaleY(1) scaleX(1);
    }
    50% {
      transform: scaleY(0.005) scaleX(1);
    }
    100% {
      transform: scaleY(0.005) scaleX(0);
    }
  }
`;

export const Board = styled.form`
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 300px;
  height: 200px;
  padding: 5px 20px;
  box-shadow: 0 0 5px 1px rgba(124, 252, 0, 0.5);
  border-radius: 5px;
  /* text-align: center; */

  label {
    font-weight: 600;
    margin-bottom: 15px;
    display: block;
    font-size: 18px;
    color: lawngreen;
    text-align: center;
  }

  input {
    background-color: transparent;
    border: 1px solid #7cfc00;
    color: lawngreen;
    width: 100%;
    height: 40px;
    font-size: 14px;
    outline: 0;
    padding: 0 0 0 10px;
    box-sizing: border-box;
    border-radius: 3px;
    margin: 10px 0;

    &::placeholder {
      color: #7cfc00;
    }
  }
`;

export const Button = styled.button`
  border: none;
  border-radius: 3px;
  padding: 12px 0;
  width: calc((100%) / 2);
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  outline: 0;

  &:nth-child(2n) {
    margin-left: 5px;
    background-color: #7cfc00;
  }

  &:nth-child(2n - 1) {
    margin-right: 5px;
    background-color: lightgrey;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin: 0;
  padding: 0;
`;
