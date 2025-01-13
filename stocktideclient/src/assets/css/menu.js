import styled from 'styled-components';
export const BoxingDiv = styled.div `
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 0.5rem;
    padding: 0.5rem;
`;
export const MenuDiv = styled.div `
    display: flex;
    justify-content: space-between;
    background-color: #ccc;
`;
export const MenuSingle = styled.div `
    font-size: 1.25rem;
    margin: 0.25rem;
    padding: 0.5rem;
    flex-grow: 1;
    font-weight: bold;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
`;
export const ContentBelowMenu = styled.div `
    margin-top: 30px;
`;
export const OutletDiv = styled.div `
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 10px;
    overflow-y: auto; /* Vertical scroll */
    overflow-x: hidden; /* Hide horizontal scroll */
    height: calc(100vh - 70px); /* Adjust height to be full height minus the menu height */
`;
export const IncludeInformationDiv = styled.div `
    position: fixed;
    top: ${({ $top }) => `${$top}rem`}; //* Adjust based on SearchCompanyComponent height */
    width: 100%;
    background-color: white;
`;
