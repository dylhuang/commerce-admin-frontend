import { post } from "@/utils/http";

function baseUrlApi(str) {
  return `/api${str}`;
}

export const findPage = (data) => {
  return post(baseUrlApi("/admin/v6_0_0/admin/findPage"), data);
};

export const addItem = (data) => {
  return post(baseUrlApi("/admin/v6_0_0/admin/save"), data);
};

export const getItem = (data) => {
  return post(baseUrlApi("/admin/v6_0_0/admin/findById"), data);
};

export const updateItem = (data) => {
  return post(baseUrlApi("/admin/v6_0_0/admin/update"), data);
};

export const delItem = (data) => {
  return post(baseUrlApi("/admin/v6_0_0/admin/delete"), data);
};

export const locked = (data) => {
  return post(baseUrlApi("/admin/v6_0_0/admin/locked"), data);
};

export const rePassword = (data) => {
  return post(baseUrlApi("/admin/v6_0_0/admin/rePassword"), data);
};

export const enable = (data) => {
  return post(baseUrlApi("/admin/v6_0_0/admin/enable"), data);
};
