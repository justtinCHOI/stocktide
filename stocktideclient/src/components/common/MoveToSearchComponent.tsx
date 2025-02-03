import styled from "styled-components";
import {FaSearch} from "react-icons/fa";
import { FC } from 'react';
import useCustomMove from '@hooks/useCustomMove';
const MoveToSearchComponent: FC = () => {
    const {moveToSearch} = useCustomMove();

    const handleInputFocus = () => {
      moveToSearch()
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