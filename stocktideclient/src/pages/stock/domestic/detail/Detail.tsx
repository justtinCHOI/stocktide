import MenuComponent from "@components/common/MenuComponent";
import {ContentBelowMenu, IncludeInformationDiv, OutletDiv} from "@assets/css/menu";
import {Outlet} from "react-router-dom";
import {useParams} from "react-router";

const Detail = () => {

    const { companyId } = useParams();

    const Menus = ['차트', '매수/매도', '상세정보', '뉴스', '채팅' ];
    const Urls = ['chart', 'buy', 'info', 'news', 'chat'].map((url) => `${url}/${companyId}`);

    return (
        <IncludeInformationDiv $top={5} >
            <MenuComponent menus={Menus} urls={Urls}/>
            <ContentBelowMenu >
                <OutletDiv>
                    <Outlet/>
                </OutletDiv>
            </ContentBelowMenu >
        </IncludeInformationDiv>
    );
}

export default Detail;
