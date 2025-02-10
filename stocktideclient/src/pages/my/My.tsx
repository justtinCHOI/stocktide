import { Outlet} from "react-router-dom";
import {ContentBelowMenu, IncludeInformationDiv, OutletDiv} from "@styles/menu";
import MenuComponent from "@components/common/MenuComponent";
import StockInfoComponent from "@components/common/StockInfoComponent";
import { useTranslation } from 'react-i18next';

const My = () => {
  const { t } = useTranslation();

  const Menus = [
    t('menu.profit'),
    t('menu.account'),
    t('menu.memberInfo'),
    t('menu.settings')
  ];

  const Urls = ['profit', 'account', 'info',  'setting'];
    return (
      <>
        <StockInfoComponent/>
        <IncludeInformationDiv $top={2}>
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

export default My;
