import { CompanyCreateDto, CompanyUpdateDto } from '@typings/dto';
export declare const getOne: (companyId: number) => Promise<any>;
export declare const getList: () => Promise<any>;
export declare const postAdd: (companyObj: CompanyCreateDto) => Promise<any>;
export declare const deleteOne: (companyId: number) => Promise<any>;
export declare const putOne: (company: CompanyUpdateDto) => Promise<any>;
