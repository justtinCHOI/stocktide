import SearchListComponent from '@components/stock/domestic/search/SearchListComponent';
import { IncludeInformationDiv } from '@assets/css/menu';

function Search() {

    return (
      <IncludeInformationDiv $top={5}>
            <SearchListComponent/>
      </IncludeInformationDiv>

    );
}

export default Search;