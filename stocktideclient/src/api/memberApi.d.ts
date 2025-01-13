import { LoginParam, LoginResponse } from '@typings/member';
import { MemberModifyDTO } from '@typings/dto';
export declare const API_SERVER_HOST: string;
export declare const loginPost: (loginParam: LoginParam) => Promise<LoginResponse>;
export declare const modifyMember: (member: MemberModifyDTO) => Promise<any>;
export declare const checkEmailDuplicate: (email: string) => Promise<any>;
