const url = import.meta.env.VITE_URL_CRUD_API;
export const getCrudUrl = (src) => `${url}/${src}`;