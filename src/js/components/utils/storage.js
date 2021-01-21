const storageSet = (name, value) => {
  window.localStorage.setItem(name, JSON.stringify(value));
};

const storageGet = (name, subst = null) => JSON
  .parse(window.localStorage.getItem(name) || subst);

const storageDel = (name) => localStorage.removeItem(name);

export {
  storageSet,
  storageGet,
  storageDel,
};
