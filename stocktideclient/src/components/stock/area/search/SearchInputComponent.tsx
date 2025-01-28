import styled from "styled-components";
import { FaSearch, FaTimes } from 'react-icons/fa';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import {setSearchTerm, setSuggestions, setSearchActive} from '@slices/searchSlice'
import useCompanyData from '@hooks/useCompanyData';
import { debounce } from 'lodash';
import { extractedCompanyData } from '@typings/hooks';

interface SearchCompanyComponentProps {
  area: string;
}

const SearchInputComponent: FC<SearchCompanyComponentProps> = ({area}) => {
  // console.log('area',area);
  const dispatch = useDispatch();
  const [ searchString, setSearchString ] = useState<string>();
  // const { searchTerm, suggestions } = useSelector((state: RootState) => state.searchSlice);
  const { searchTerm } = useSelector((state: RootState) => state.searchSlice);
  const [isFocused, setIsFocused] = useState(false);
  // const {data: companies, isLoading, isError} = useCompanyData(1, 79);
  const {data: companies} = useCompanyData(1, 79);
  const searchInputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    dispatch(setSearchActive(false));
    dispatch(setSearchTerm(''));
    // 컴포넌트 마운트 후 자동 포커스
    searchInputRef.current?.focus();
  }, []);

  useEffect(() => {
    setSearchString(searchTerm)
  }, [searchTerm, area])

  // 필터링 함수를 컴포넌트 외부로 이동
  const filterCompanies = (companies: extractedCompanyData[], term: string) => {
    return companies?.filter((company: extractedCompanyData) =>
      company.korName.toLowerCase().includes(term.toLowerCase()) ||
      company.code.includes(term)
    ) || [];
  };

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      dispatch(setSearchTerm(term));
      // API 호출 또는 로컬 필터링, 여기서는 예시로 로컬 메모이제이션된 필터링만 구현
      if (term.length >= 1 && Array.isArray(companies) &&  companies.length > 0) {
        const filtered = filterCompanies(companies, term);
        dispatch(setSuggestions(filtered));
      } else {
        dispatch(setSuggestions([]));
      }
    }, 150),
    []
  );


  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchString(value);
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
            ref={searchInputRef}
            placeholder="회사명 또는 종목코드 검색"
            onChange={handleSearchChange}
            onFocus={handleInputFocus}
            value={searchString}
          />
          {searchTerm ? (
            <ClearIcon onClick={clearSearch}/>
            ):
            <SearchIcon />
          }
        </SearchInputDiv>
        {/*{suggestions[0] && searchTerm && (*/}
        {/*  <p>*/}
        {/*    {searchTerm}*/}
        {/*    {suggestions[0].korName.slice(searchTerm.length)}*/}
        {/*  </p>*/}
        {/*)}*/}
      </>
    );
};

export default SearchInputComponent;

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
