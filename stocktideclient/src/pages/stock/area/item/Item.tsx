import MenuComponent from "@components/common/MenuComponent";
import {Outlet} from "react-router-dom";
import {ContentBelowMenu, IncludeInformationDiv, OutletDiv} from "@styles/menu";
import MoveToSearchComponent from '@components/common/MoveToSearchComponent';
import { useTranslation } from 'react-i18next';

const Item = () => {
  const { t } = useTranslation();

  const Menus = [
    t('menu.entireStocks'),
    t('menu.holdStocks'),
    t('menu.watchStocks')
  ];

  const Urls = ['entire', 'hold', 'watch'];

  return (
    <>
      <MoveToSearchComponent/>
      <IncludeInformationDiv $top={5}>
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
export default Item;