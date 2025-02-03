import {useNavigate} from "react-router-dom";
import {useState} from "react";
import { useParams } from 'react-router';


//파라미터 값을 통해서 각페이지로 이동하는 함수
function useCustomMove(){
    const navigate = useNavigate()
    const {area} = useParams();


    //같은 페이지를 다시 호출했을 시 리스트를 다시 로드하기 위해서
    const[refresh, setRefresh] = useState<boolean>(false)

    //넘어오는 페이지 설정값으로 list로 이동
    const moveToList = () => {
        setRefresh(!refresh)
        navigate({pathname: `/stock/${area}/item/entire`})
    }

    const moveToModify = (num: number) => {
        navigate({pathname:`/stock/${area}/detail/modify/${num}`})
    }

    const moveToMemberModify = () => {
        navigate({pathname:`/my/modify/`})
    }

    const moveToChart = (num: number) => {
        navigate({pathname:`/stock/${area}/detail/chart/${num}`})
    }

    const moveToSearch = () => {
        navigate({pathname:`/stock/${area}/search/`})
    }

    return {moveToList, moveToModify, moveToChart, moveToMemberModify, moveToSearch, refresh}

}

export default useCustomMove;
