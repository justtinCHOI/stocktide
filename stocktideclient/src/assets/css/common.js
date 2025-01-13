import styled from 'styled-components';
import { Link } from 'react-router-dom';
export const StyledLink = styled(Link) `
    color: inherit;
    text-decoration: none;
    width: 100%;
    height: 100%;
    display: block;
    
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
        color: inherit;
    }
`;
