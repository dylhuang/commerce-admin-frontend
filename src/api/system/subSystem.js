import { post } from "@/utils/http";

function baseUrlApi(str) {
  return `/api${str}`;
}

export const getList = (data) => {
  return post(baseUrlApi("/admin/v6_0_0/subSystem/findPage"), data);
};

export const addItem = (data) => {
  return post(baseUrlApi("/admin/v6_0_0/subSystem/save"), data);
};

export const getItem = (data) => {
  return post(baseUrlApi("/admin/v6_0_0/subSystem/findById"), data);
};

export const updateItem = (data) => {
  return post(baseUrlApi("/admin/v6_0_0/subSystem/update"), data);
};

export const delItem = (data) => {
  return post(baseUrlApi("/admin/v6_0_0/subSystem/delete"), data);
};
