import { Runtime } from 'webextension-polyfill';

export const onRequest = async (
  msg: EXTMessage,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  sender: Runtime.SendMessageOptionsType,
): Promise<EXTResponse | undefined> => {
  try {
    switch (msg.type) {
      // call inject component code when tab is updated
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
