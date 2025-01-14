import styled from "styled-components";

const StockInfoComponent = () => {
    return (
        <StockInfoDiv>
            <Logo>StockTide</Logo>
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

const Logo = styled.p`
    font-weight: bold;
    font-size: 1.5rem;
    color: #2d3748;
`;