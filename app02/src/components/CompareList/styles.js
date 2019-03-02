import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

export const Repository = styled.div`
  display: flex;
  flex-direction: column;

  background-color: #fff;
  width: 250px;
  border-radius: 3px;
  margin: 10px;

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
`;
