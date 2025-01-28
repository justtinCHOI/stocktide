import {useParams} from "react-router";
import CompanyInfoComponent from '@components/stock/area/detail/info/CompanyInfoComponent';

function companyInfo() {

    const {companyId} = useParams();

    const companyIdNumber = Number(companyId); // 숫자로 변환

    return (
        <CompanyInfoComponent companyId={companyIdNumber}/>
    );
}

export default companyInfo;