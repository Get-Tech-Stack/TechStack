declare type EXTMessageType = 'CHANGE_COLOR' | 'REJECT' | 'SUCCESS' | 'ERROR';

declare type EXTMessage<T = any> = {
    type: EXTMessageType;
    data?: T;
};
