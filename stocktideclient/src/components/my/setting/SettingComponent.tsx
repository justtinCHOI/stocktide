import { FC, useEffect, useState } from 'react';
import {getOne} from "@api/companyApi";
import useCustomMove from "@hooks/useCustomMove";
import LanguageSelector from '@components/my/setting/LanguageSelector';

const initState = {
    tno: 0,
    title: '',
    writer: '',
    dueDate: '',
    complete: false
};

const SettingComponent: FC<SettingProps> = ({tno}) => {
    const [todo, setTodo] = useState(initState);
    const {moveToList, moveToModify} = useCustomMove();

    useEffect(() => {
        getOne(tno).then(data => {
            setTodo(data);
        }).catch(err => {
            console.error("Failed to fetch my article:", err);
            setTodo(initState); // 초기 상태로 설정
        });
    }, [tno]);

    return (
      <>
          <LanguageSelector/>
          <div className="border-2 border-sky-200 mt-10 m-2 p-4">
              {makeDiv('Tno', todo.tno)}
              {makeDiv('Writer', todo.writer)}
              {makeDiv('Title', todo.title)}
              {makeDiv('Status', todo.complete ? 'Completed' : 'Not Yet')}
              <div className="flex justify-end p-4">
                  <button type="button"
                          className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
                          onClick={() => moveToList()}>
                      List
                  </button>
              </div>
              <div className="flex justify-end p-4">
                  <button type="button"
                          className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
                          onClick={() => moveToModify(todo.tno)}>
                      Modify
                  </button>
              </div>
          </div>
      </>

    );
}

const makeDiv = (title: string, value: any) => (
  <div className="flex justify-center">
      <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">{title}</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
              {value}
          </div>
      </div>
  </div>
);

export default SettingComponent;
