import { post } from "@/utils/http";

function baseUrlApi(str) {
  return `/api${str}`;
}

export const getList = (data) => {
  return post(baseUrlApi("/admin/v6_0_0/codeType/findPage"), data);
};

export const addItem = (data) => {
  return post(baseUrlApi("/admin/v6_0_0/codeType/save"), data);
};

export const getItem = (data) => {
  return post(baseUrlApi("/admin/v6_0_0/codeType/findById"), data);
};

export const updateItem = (data) => {
  return post(baseUrlApi("/admin/v6_0_0/codeType/update"), data);
};

export const delItem = (data) => {
  return post(baseUrlApi("/admin/v6_0_0/codeType/delete"), data);
};

export const flushCache = () => {
  return post(baseUrlApi("/admin/v6_0_0/codeType/flushCache"), null);
};
