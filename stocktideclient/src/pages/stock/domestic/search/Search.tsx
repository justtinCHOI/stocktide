import SearchListComponent from '@components/stock/domestic/search/SearchListComponent';
import { IncludeInformationDiv } from '@assets/css/menu';
import SearchDomesticCompanyComponent from '@components/stock/domestic/search/SearchDomesticCompanyComponent';
import { useEffect } from 'react';
import { setSearchActive, setSearchTerm } from '@slices/searchSlice';
import { useDispatch } from 'react-redux';

function Search() {

  const dispatch = useDispatch();
  useEffect(() => {
    // 컴포넌트 언마운트 시 검색 상태 초기화
    return () => {
      dispatch(setSearchActive(false));
      dispatch(setSearchTerm(''));
    };
  }, []);

    return (
      <>
        <SearchDomesticCompanyComponent area={'domestic'}/>
        <IncludeInformationDiv $top={5}>
              <SearchListComponent/>
        </IncludeInformationDiv>
      </>
    );
}

export default Search;