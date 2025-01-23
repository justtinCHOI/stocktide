import { Outlet} from "react-router-dom";
import {ContentBelowMenu, IncludeInformationDiv, OutletDiv} from "@styles/menu";
import MenuComponent from "@components/common/MenuComponent";
import StockInfoComponent from "@components/common/StockInfoComponent";

const My = () => {

    const Menus = ['손익', '계좌', '회원정보',  '설정'  ];
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
