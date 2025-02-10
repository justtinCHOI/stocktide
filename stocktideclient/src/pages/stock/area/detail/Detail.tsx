import MenuComponent from "@components/common/MenuComponent";
import {ContentBelowMenu, IncludeInformationDiv, OutletDiv} from "@styles/menu";
import {Outlet} from "react-router-dom";
import {useParams} from "react-router";
import MoveToSearchComponent from '@components/common/MoveToSearchComponent';
import { useTranslation } from 'react-i18next';

const Detail = () => {
  const { t } = useTranslation();

    const { companyId } = useParams();

  const Menus = [
    t('menu.chart'),
    t('menu.trading'),
    t('menu.info'),
    t('menu.news'),
    t('menu.chat')
  ];
    const Urls = ['chart', 'buy', 'info', 'news', 'chat'].map((url) => `${url}/${companyId}`);

    return (
      <>
        <MoveToSearchComponent/>
        <IncludeInformationDiv $top={5} >
          <MenuComponent menus={Menus} urls={Urls}/>
          <ContentBelowMenu >
            <OutletDiv>
              <Outlet/>
            </OutletDiv>
          </ContentBelowMenu >
        </IncludeInformationDiv>
      </>

    );
}

export default Detail;
