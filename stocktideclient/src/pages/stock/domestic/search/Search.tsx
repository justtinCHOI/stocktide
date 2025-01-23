import SearchListComponent from '@components/stock/domestic/search/SearchListComponent';
import { IncludeInformationDiv } from '@assets/css/menu';
import SearchDomesticCompanyComponent from '@components/stock/domestic/search/SearchDomesticCompanyComponent';

function Search() {
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