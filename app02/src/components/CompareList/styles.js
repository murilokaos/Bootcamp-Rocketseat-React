import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 50px;
`;

export const Repository = styled.div`
  display: flex;
  flex-direction: column;

  background-color: #fff;
  width: 250px;
  border-radius: 3px;
  margin: 10px;

  @keyframes rotate {
    0% {
      transform: rotate(360deg);
    }
    25% {
      transform: rotate(180deg);
    }
    50% {
      transform: rotate(90deg);
    }
    75% {
      transform: rotate(0deg);
    }
  }

  header {
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    strong {
      font-size: 24px;
      margin-top: 10px;
    }

    small {
      color: #666;
      font-size: 14px;
    }

    img {
      width: 64px;
    }
  }

  ul {
    list-style: none;
    margin-top: auto;

    li {
      font-weight: bold;
      padding: 12px 20px;

      small {
        font-weight: normal;
        font-size: 12px;
        color: #999;
        font-style: italic;
        margin: 0 5px;
      }

      &:nth-child(2n - 1) {
        background: #f5f5f5;
      }
    }
  }

  button {
    border: none;
    background: none;
    padding: 15px;

    i:hover {
      animation: rotate linear 1s infinite reverse;
      cursor: pointer;
    }

    &.delete {
      width: 30px;
      height: 30px;
      border-radius: 50px;
      padding: 0;
      background: #ebebeb;
      margin-left: 130%;
      margin-top: -45px;
      color: #585858;
    }

    &.delete i:hover {
      animation: none;
    }
  }
`;
