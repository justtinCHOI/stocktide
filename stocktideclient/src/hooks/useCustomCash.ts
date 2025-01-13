import { useDispatch, useSelector } from "react-redux";
import {
    getCashListRequest,
    createCashRequest,
    deleteCashRequest,
    updateCashRequest,
    setCashId
} from "@slices/cashSlice";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState, store } from '@/store';
import { CustomCashHook } from '@typings/hooks';
import { Cash } from '@typings/entity';
import { toast } from 'react-toastify';

const useCustomCash = (): CustomCashHook => {
    const dispatch = useDispatch<AppDispatch>();
    const cashState = useSelector((state: RootState) => state.cashSlice);
    const navigate = useNavigate();

    const doCreateCash = async (memberId: number): Promise<Cash> => {
        dispatch(createCashRequest(memberId));
        return new Promise((resolve, reject) => {
            const unsubscribe = store.subscribe(() => {
                const state = store.getState().cashSlice;
                if (!state.loading) {
                    unsubscribe();
                    if (state.error) {
                        reject(state.error);
                    } else {
                        resolve(state.cashList[state.cashList.length - 1]);
                    }
                }
            });
        });
    }

    const doGetCashList = async (memberId: number): Promise<Cash[]> => {
        dispatch(getCashListRequest(memberId));
        return new Promise((resolve, reject) => {
            const unsubscribe = store.subscribe(() => {
                const state = store.getState().cashSlice;
                if (!state.loading) {
                    unsubscribe();
                    if (state.error) {
                        reject(state.error);
                    } else {
                        resolve(state.cashList);
                    }
                }
            });
        });
    }

    const doDeleteCash = async (cashId: number): Promise<number> => {
        dispatch(deleteCashRequest(cashId));
        return new Promise((resolve, reject) => {
            const unsubscribe = store.subscribe(() => {
                const state = store.getState().cashSlice;
                if (!state.loading) {
                    unsubscribe();
                    if (state.error) {
                        reject(state.error);
                    } else {
                        resolve(cashId);
                    }
                }
            });
        });
    }

    const doUpdateCash = async (cashId: number, money: number, dollar: number): Promise<Cash> => {
        dispatch(updateCashRequest({ cashId, money, dollar }));
        return new Promise((resolve, reject) => {
            const unsubscribe = store.subscribe(() => {
                const state = store.getState().cashSlice;
                if (!state.loading) {
                    unsubscribe();
                    if (state.error) {
                        toast.error("계좌 업데이트에 실패했습니다");
                        reject(state.error);
                    } else {
                        const updatedCash = state.cashList.find((cash: Cash) => cash.cashId === cashId);
                        if (updatedCash) {
                            resolve(updatedCash);
                        } else {
                            reject(new Error('Updated cash not found'));
                        }
                    }
                }
            });
        });
    }

    const doUpdateCashId = (cashId: number) => {
        dispatch(setCashId(cashId));
    }

    const moveToManage = () => {
        navigate({pathname: '/my/account/manage'}, {replace:true});
    }

    return {
        cashState,
        doUpdateCashId,
        doCreateCash,
        doGetCashList,
        doDeleteCash,
        doUpdateCash,
        moveToManage
    };
}

export default useCustomCash;