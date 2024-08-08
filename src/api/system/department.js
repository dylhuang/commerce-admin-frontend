import { post } from "@/utils/http";

function baseUrlApi(str) {
  return `/api${str}`;
}

export const getList = (data) => {
  return post(baseUrlApi("/admin/v6_0_0/department/findPage"), data);
};

export const addItem = (data) => {
  return post(baseUrlApi("/admin/v6_0_0/department/save"), data);
};

export const getItem = (data) => {
  return post(baseUrlApi("/admin/v6_0_0/department/findById"), data);
};

export const updateItem = (data) => {
  return post(baseUrlApi("/admin/v6_0_0/department/update"), data);
};

export const delItem = (data) => {
  return post(baseUrlApi("/admin/v6_0_0/department/delete"), data);
};

export const getTree = (data) => {
  return post(baseUrlApi("/admin/v6_0_0/department/findTree"), data);
};
