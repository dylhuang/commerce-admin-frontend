import {baseUri, post,get,undel, put} from "@/utils/http";

function baseUrlApi(str) {
  return `/api${str}`;
}

export const findPage = (data) => {
  return post(baseUrlApi("/sys/user/pageList"), data);
};

export const addItem = (data) => {
  return post(baseUrlApi("/sys/user/add"), data);
};

export const getItem = (data) => {
  return get(baseUrlApi("/sys/user/fetchDetail"), data);
};

export const updateItem = (data) => {
  return put(baseUrlApi("/sys/user/edit"), data);
};

export const delItem = (data) => {
  const ids = data.map(id => `ids=${id}`).join('&')
  return undel(baseUri("/sys/menu/remove?"+ids ));
};
export const getList = (data) => {
  return post(baseUrlApi("/sys/role/pageList"), data);
}
export const locked = (data) => {
  return post(baseUrlApi("/admin/v6_0_0/admin/locked"), data);
};

export const rePassword = (data) => {
  return post(baseUrlApi("/admin/v6_0_0/admin/rePassword"), data);
};

export const enable = (data) => {
  return post(baseUrlApi("/admin/v6_0_0/admin/enable"), data);
};
