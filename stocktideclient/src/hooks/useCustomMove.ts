import {useNavigate} from "react-router-dom";
import {useState} from "react";
import { CustomMoveHook } from '@typings/hooks';


//파라미터 값을 통해서 각페이지로 이동하는 함수
function useCustomMove(): CustomMoveHook {
    const navigate = useNavigate()

    //같은 페이지를 다시 호출했을 시 리스트를 다시 로드하기 위해서
    const[refresh, setRefresh] = useState<boolean>(false)

    //넘어오는 페이지 설정값으로 list로 이동
    const moveToList = () => {
        setRefresh(!refresh)
        navigate({pathname: '/stock/domestic/item/entire'})
    }

    const moveToModify = (num: number) => {
        navigate({pathname:`/stock/domestic/detail/modify/${num}`})

    }

    const moveToMemberModify = () => {
        navigate({pathname:`/my/modify/`})
    }

    const moveToRead = (num: number) => {
        navigate({pathname:`/stock/domestic/detail/read/${num}`})
    }

    return {moveToList, moveToModify, moveToRead, moveToMemberModify, refresh}

}

export default useCustomMove;
