declare type EXTResponseType = 'SUCCESS' | 'FAILED' | 'PENDING' | 'UNAUTHORIZED' | 'AUTHENTICATED';

declare type EXTResponse<T = any> = {
    type: EXTResponseType;
    data?: T;
};
