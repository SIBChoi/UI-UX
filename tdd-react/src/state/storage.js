import SecureLS from 'secure-ls';

const secureLs = new SecureLS();

const getItem = (key) => {
  return secureLs.get(key);
};

const setItem = (key, value) => {
  secureLs.set(key, value);
};

const clear = () => {
  localStorage.clear();
};

const storage = {
  getItem,
  setItem,
  clear,
};

export default storage;
