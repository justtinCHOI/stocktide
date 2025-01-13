export declare const getKakaoLoginLink: () => string;
export declare const getAccessToken: (authCode: string) => Promise<any>;
export declare const getMemberWithAccessToken: (accessToken: string) => Promise<any>;
