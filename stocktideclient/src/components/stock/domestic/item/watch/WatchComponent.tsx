// import {useEffect, useState} from 'react';
// import {getList} from "@api/companyApi";
// import useCustomMove from "@hooks/useCustomMove";
// import PageComponent from "@common/PageComponent";
// const initState = {
//     dtoList : [],
//     pageNumList : [],
//     pageRequestDTO : null,
//     prev : false,
//     next : false,
//     totalCount : 0,
//     prevPage : 0,
//     nextPage : 0,
//     totalPage : 0,
//     current : 0
// }

function WatchComponent() {
    //navigate -> router -> useCustomMove -> page,size, refresh 변경 -> useEffect -> setServerData

    // const {page, size, refresh, moveToList, moveToRead} = useCustomMove();
    //
    // const [serverData, setServerData] = useState(initState);
    //
    // useEffect(() => {
    //     getList({page, size}).then(data => {
    //         console.log(data);
    //         setServerData(data);
    //     })
    //
    // }, [page, size, refresh]);

    return (
        <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
            <div className="flex flex-wrap mx-auto justify-center p-1">
                {/*{serverData.dtoList.map(company =>*/}
                {/*    <div key={company.companyId} className="w-full min-w-[400px] p-2 m-2 rounded shadow-md"*/}
                {/*         onClick={() => moveToRead(company.companyId)}*/}
                {/*    >*/}
                {/*        <div className="flex w-full">*/}
                {/*            <div className="font-extrabold text-2xl p-2 flex-grow">{company.companyId}</div>*/}
                {/*            <div className="text-1xl m-1 p-2 flex-grow">{company.korName}</div>*/}
                {/*            <div className="text-1xl m-1 p-2 flex-grow">{company.created_at}</div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*)}*/}
                WatchComponent
            </div>
            {/*<PageComponent serverData={serverData} movePage={moveToList}/>*/}
        </div>
    );
}

export default WatchComponent;
