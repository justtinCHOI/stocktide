import styled from 'styled-components';

const Header = () => {
    return (
        <HeaderContainer>
            <Logo>Stock Project</Logo>
        </HeaderContainer>
    );
};

export default Header;

const HeaderContainer = styled.header`
    background-color: #282c34;
    padding: 20px;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Logo = styled.h1`
    font-size: 1.5em;
`;

