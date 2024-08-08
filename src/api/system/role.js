import { post } from "@/utils/http";

function baseUrlApi(str) {
  return `/api${str}`;
}

export const getList = (data) => {
  return post(baseUrlApi("/admin/v6_0_0/role/findPage"), data);
};

export const addItem = (data) => {
  return post(baseUrlApi("/admin/v6_0_0/role/save"), data);
};

export const getItem = (data) => {
  return post(baseUrlApi("/admin/v6_0_0/role/findById"), data);
};

export const updateItem = (data) => {
  return post(baseUrlApi("/admin/v6_0_0/role/update"), data);
};

export const delItem = (data) => {
  return post(baseUrlApi("/admin/v6_0_0/role/delete"), data);
};

export const getTree = (data) => {
  return post(baseUrlApi("/admin/v6_0_0/role/findRoleTree"), data);
};
