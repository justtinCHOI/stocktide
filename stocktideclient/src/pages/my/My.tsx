import { Outlet} from "react-router-dom";
import {ContentBelowMenu, IncludeInformationDiv, OutletDiv} from "@assets/css/menu";
import MenuComponent from "@components/common/MenuComponent";
import StockInfoComponent from "@components/common/StockInfoComponent";

const My = () => {

    const Menus = ['손익', '회원정보', '회사추가',  '설정' , '계좌'];
    const Urls = ['profit', 'info', 'company/add', 'setting', 'account'];
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
