import storage from './storage';

// WIP
const get_options = (key: string): boolean => {
  storage.get([key]);
  return true;
};

export default get_options;
