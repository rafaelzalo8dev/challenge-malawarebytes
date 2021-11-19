import styled from 'styled-components';
import { media } from '../../helper';

export const Content = styled.section`
  width: 100%;
  & h2 {
    margin-top: 40px;
    margin-bottom: 40px;
    text-align: center;
    font-size: 40px;
  }

  & h3 {
    font-size: 36px;
    margin-bottom: 40px;
    text-align: center;
  }

  ${media.large} {
    & h2 {
      font-size: 56px;
      margin-bottom: 32px;
    }
  }

  ${media.medium} {
    & h2 {
      font-size: 34px;
      margin-bottom: 24px;
    }

    & h3 {
      font-size: 18px;
    }
  }
`;

export const Avatar = styled.img`
  max-width: 50px;
  max-height: 50px;
`;

export const AvatarCard = styled.img`
  width: 100%;
  height: 100%;
`;

export const StatusBar = styled.div`
  background-color: ${props => props.status ? '#c63e3e' : '#4caf50'}; 
  padding: 8px 10px;
  width: 100%;
  text-align: center;
  border-radius: 2px;
  max-width: 80%;
  color: white;
  font-weight: bold;
  margin-left: 10%;
`;

export const InfoContainer = styled.div``;

export const ContainerSwitch = styled.div`
  width: 100%;
  text-align: center;
`;

export const TableContainer = styled.div`
  min-width: 680px;
  padding: 20px;

  & h3 {
    padding: 24px;
    font-size: 22px;
    border-bottom: 1px solid #f8f8f8;
    margin: 0;
  }

  & .header-table {
    padding: 16px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #9a9a9a;
    font-weight: bold;
    font-size: 14px;
    width: calc(100% - 24px);
    border-bottom: solid 3px #000;
  }

  & .header-table .description {
    flex-grow: 1;
    width: 20%;
    text-transform: capitalize;
  }

  & .header-table .image {
    width: 60px;
  }

  & .header-table .amount {
    width: 20%;
    flex-shrink: 0;
  }

  & .header-item {
    display: flex;
    padding: 16px 24px;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    width: 100%;
    border-bottom: solid 1px #e1e1e1;
  }

  & .header-item .description {
    flex-grow: 1;
    width: ${props => props.maxWidth}%;
  }

  & .header-item .image {
    width: 60px;
  }

  & .header-item .imageContainer {
    width: 30px;
    height: 30px;
  }
  & .header-item .amount {
    width: ${props => props.maxWidth}%;
    flex-shrink: 0;
  }

  & table {
    width: 100%;
  }

  & th,
  & td {
    text-align: left;
    font-weight: 300;
    padding-bottom: 16px;
  }
`;
