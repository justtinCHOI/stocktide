import styled from "styled-components";
import { FaSearch, FaTimes } from 'react-icons/fa';
import { FC, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import {setSearchTerm, setSuggestions, setSearchActive} from '@slices/searchSlice'
import useCompanyData from '@hooks/useCompanyData';
import { debounce } from 'lodash';

interface SearchCompanyComponentProps {
  area: string;
}

const SearchDomesticCompanyComponent: FC<SearchCompanyComponentProps> = ({area}) => {
  console.log('area',area);
  const dispatch = useDispatch();
  const { searchTerm, recentSearches } = useSelector((state: RootState) => state.searchSlice);
  const [isFocused, setIsFocused] = useState(false);
  const {data: companies, isLoading, isError} = useCompanyData(1, 79);

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      dispatch(setSearchTerm(term));
      if (term.length >= 1 && Array.isArray(companies) &&  companies.length > 0) {
        // API 호출 또는 로컬 필터링
        // 여기서는 예시로 로컬 필터링만 구현
        const filtered = companies.filter(company =>
          company.korName.toLowerCase().includes(term.toLowerCase()) ||
          company.code.includes(term)
        );
        dispatch(setSuggestions(filtered));
      }
    }, 300),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    debouncedSearch(value);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    dispatch(setSearchActive(true));
  };

  const clearSearch = () => {
    dispatch(setSearchTerm(''));
    dispatch(setSuggestions([]));
  };
    return (
      <>
        <SearchInputDiv $isFocused={isFocused}>

          <SearchInput
            placeholder="회사명 또는 종목코드 검색"
            onChange={handleSearchChange}
            onFocus={handleInputFocus}
            value={searchTerm}
          />
          {searchTerm ? (
            <ClearIcon onClick={clearSearch}/>
            ):
            <SearchIcon />
          }
        </SearchInputDiv>
        {isFocused && (
          <RecentSearches>
            <RecentTitle>최근 검색어</RecentTitle>
            {recentSearches.map((term, index) => (
              <RecentItem key={index} onClick={() => debouncedSearch(term)}>
                {term}
              </RecentItem>
            ))}
          </RecentSearches>
        )}
      </>
    );
};

export default SearchDomesticCompanyComponent;

export type IsFocusedProps = {
  $isFocused: boolean;
}

const SearchInputDiv = styled.div<IsFocusedProps>`
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

const ClearIcon = styled(FaTimes)`
    position: absolute;
    right: 28px;
    color: #a0aec0;

    &:hover {
        color: #333;
    }
`;

const RecentSearches = styled.div`
 position: absolute;
 top: 100%;
 left: 0;
 right: 0;
 background: white;
 border-radius: 0 0 8px 8px;
 box-shadow: 0 4px 6px rgba(0,0,0,0.1);
 padding: 8px 0;
 z-index: 10;
`;

const RecentTitle = styled.div`
 padding: 8px 16px;
 color: #666;
 font-size: 0.9rem;
 font-weight: 500;
 border-bottom: 1px solid #eee;
`;

const RecentItem = styled.div`
 padding: 8px 16px;
 cursor: pointer;
 display: flex;
 align-items: center;
 gap: 8px;
 color: #333;

 &:hover {
   background-color: #f5f5f5;
 }
`;