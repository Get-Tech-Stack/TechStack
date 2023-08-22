import { Runtime } from 'webextension-polyfill';

export const onRequest = async (
    msg: EXTMessage,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sender: Runtime.SendMessageOptionsType,
): Promise<EXTResponse | undefined> => {
    try {
        switch (msg.type) {
            case 'CHANGE_COLOR': {
                document.body.style.background = msg?.data?.color;
                break;
            }
            case 'REJECT': {
                const event = new Event('reject');
                window.dispatchEvent(event);
                return { type: 'SUCCESS' };
            }
            default:
                return { type: 'SUCCESS' };
        }
    } catch (error) {
        throw error;
    }
};

export default onRequest;
