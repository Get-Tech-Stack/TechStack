import { storage } from 'webextension-polyfill';

export default storage.sync ? storage.sync : storage.local;
