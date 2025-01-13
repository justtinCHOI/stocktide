import styled from 'styled-components';


const Footer = () => {
    return (
        <FooterContainer>
            <p>&copy; 2024 Stock Project</p>
        </FooterContainer>
    );
};

export default Footer;

const FooterContainer = styled.footer`
  background-color: #282c34;
  padding: 20px;
  color: white;
  text-align: center;
`;
