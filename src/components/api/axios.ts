import axiosDefault from "axios";

const baseAxios = axiosDefault.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

export default baseAxios;
