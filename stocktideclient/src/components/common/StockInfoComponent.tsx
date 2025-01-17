import styled from "styled-components";
import { Link } from 'react-router-dom';

const StockInfoComponent = () => {
    return (
        <StockInfoDiv>
            <Logo to={'/welcome'}>StockTide</Logo>
        </StockInfoDiv>
    );
};

export default StockInfoComponent;


const StockInfoDiv = styled.div`
    background-color: #fff;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10;
`;

const Logo = styled(Link)`
    font-weight: bold;
    font-size: 1.5rem;
    color: #2d3748;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
        color: inherit;
    }
`;