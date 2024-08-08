import { post } from "@/utils/http";

function baseUrlApi(str) {
  return `/api${str}`;
}

export const getResourceList = (data) => {
  return post(baseUrlApi("/admin/resourceUrl/findPage"), data);
};

export const addMenu = (data) => {
  return post(baseUrlApi("/admin/resourceUrl/save"), data);
};

export const getMenuInfo = (data) => {
  return post(baseUrlApi("/admin/resourceUrl/findById"), data);
};

export const updateMenu = (data) => {
  return post(baseUrlApi("/admin/resourceUrl/update"), data);
};

export const delMenu = (data) => {
  return post(baseUrlApi("/admin/resourceUrl/delete"), data);
};
