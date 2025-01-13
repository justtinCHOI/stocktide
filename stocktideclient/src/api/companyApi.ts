import { CompanyCreateDto, CompanyUpdateDto } from '@typings/dto';

const API_SERVER_HOST = import.meta.env.VITE_API_URL;
import jwtAxios from '@utils/jwtUtil';

const prefix = `${API_SERVER_HOST}/api/company`

export const getOne = async(companyId: number) => {
    const res = await jwtAxios.get( `${prefix}/${companyId}`)
    return res.data
}

export const getList = async() =>{
    const res = await jwtAxios.get(`${prefix}/list/`)
    return res.data
}

export const postAdd = async(companyObj: CompanyCreateDto)=>{
    const res = await jwtAxios.post(`${prefix}/`, companyObj)
    return res.data
}

export const deleteOne = async(companyId: number)=>{
    const res = await jwtAxios.delete(`${prefix}/${companyId}`)

    return res.data
}

export const putOne = async(company: CompanyUpdateDto)=>{
    const res = await jwtAxios.put(`${prefix}/${company.companyId}`, company)
    return res.data
}
