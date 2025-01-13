import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <NotFoundWrapper>
    <NotFoundText>Page Not Found</NotFoundText>
    <p>The page you requested does not exist or an issue occurred during navigation.</p>
    <NotFoundBackButton to="/">Return to Home</NotFoundBackButton>
  </NotFoundWrapper>
);

export default NotFoundPage;

export const NotFoundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 38px);
  background: white;
  color: #ffffff;
  text-align: center;
`;

export const NotFoundText = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: black; // 부드러운 레드 색상으로 강조
`;

export const NotFoundBackButton = styled(Link)`
  margin-top: 1.5rem;
  padding: 0.5rem 1rem;
  background-color:  black;
  color: #ffffff;
  border-radius: 5px;
  text-decoration: none;
  font-size: 1rem;
  box-shadow: 0 2px 5px rgba(255, 255, 255, 0.2);
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(20, 20, 160);
  }
`;
