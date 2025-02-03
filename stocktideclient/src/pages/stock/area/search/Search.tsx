import SearchComponent from '@components/stock/area/search/SearchComponent';
import { IncludeInformationDiv } from '@styles/menu';
import SearchInputComponent from '@components/stock/area/search/SearchInputComponent';

function Search() {
    return (
      <>
        <SearchInputComponent/>
        <IncludeInformationDiv $top={5}>
              <SearchComponent/>
        </IncludeInformationDiv>
      </>
    );
}

export default Search;