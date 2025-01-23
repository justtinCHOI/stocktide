import styled from "styled-components";
import {FaSearch} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import { FC } from 'react';

interface SearchCompanyComponentProps {
  area: string;
}

const MoveToSearchComponent: FC<SearchCompanyComponentProps> = ({area}) => {
    const navigate = useNavigate();

    const handleInputFocus = () => {
        navigate(`/stock/${area}/search`);
    };
    return (
        <SearchInputDiv>
            <SearchInput placeholder="검색어를 입력하세요"  onFocus={handleInputFocus}/>
            <SearchIcon />
        </SearchInputDiv>
    );
};

export default MoveToSearchComponent;

const SearchInputDiv = styled.div`
    position: fixed;
    display: flex;
    align-items: center;
    padding: 15px;
    width: 100%;
    top: 20px;
`;

const SearchInput = styled.input`
    width: 100%;
    padding: 8px;
    border: none;
    background-color: #e2e8f0;
    border-radius: 10px;
    &:focus {
        outline: none;
        border-color: #4299e1;
        box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.6);
    }
`;

const SearchIcon = styled(FaSearch)`
    position: absolute;
    right: 28px;
    color: #a0aec0;
`;