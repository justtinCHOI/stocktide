import { FC } from 'react';

interface ServerData {
    prev: boolean;
    next: boolean;
    prevPage: number;
    nextPage: number;
    current: number;
    pageNumList: number[];
}

interface PageComponentProps {
    serverData: ServerData;
    movePage: (params: { page: number; size: number }) => void;
}


const  PageComponent: FC<PageComponentProps> = ({ serverData, movePage }) => {
    return (
        <div className="m-6 flex justify-center">
            {serverData.prev ? (
                <div
                    className="m-2 p-2 w-16 text-center font-bold text-blue-400"
                    onClick={() => movePage({ page: serverData.prevPage, size: 10 })}
                >
                    Prev
                </div>
            ) : null}
            {serverData.pageNumList.map(pageNum => (
                <div
                    key={pageNum}
                    className={`m-2 p-2 w-12 text-center rounded shadow-md text-white ${
                        serverData.current === pageNum ? 'bg-gray-500' : 'bg-blue-400'
                    }`}
                    onClick={() => movePage({ page: pageNum, size: 10 })}
                >
                    {pageNum}
                </div>
            ))}
            {serverData.next ? (
                <div
                    className="m-2 p-2 w-16 text-center font-bold text-blue-400"
                    onClick={() => movePage({ page: serverData.nextPage, size: 10 })}
                >
                    Next
                </div>
            ) : null}
        </div>
    );
}

export default PageComponent;
