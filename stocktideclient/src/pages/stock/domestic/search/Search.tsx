import SearchComponent from '@components/stock/domestic/search/SearchComponent';
import { IncludeInformationDiv } from '@assets/css/menu';
import SearchInputComponent from '@components/stock/domestic/search/SearchInputComponent';

function Search() {
    return (
      <>
        <SearchInputComponent area={'domestic'}/>
        <IncludeInformationDiv $top={5}>
              <SearchComponent/>
        </IncludeInformationDiv>
      </>
    );
}

export default Search;