import { post,get,baseUri,put,undel } from "@/utils/http";

function baseUrlApi(str) {
  return `/api${str}`;
}

export const getResourceList = (data) => {
  return post(baseUrlApi("/sys/menu/pageList"), data);
};

export const addMenu = (data) => {
  return post(baseUrlApi("/sys/menu/add"), data);
};

export const getMenuInfo = (data) => {
  return get(baseUri("/sys/menu/fetchDetail"), data);
};

export const updateMenu = (data) => {
  return put(baseUrlApi("/sys/menu/edit"), data);
};

export const delMenu = (data) => {
  const ids = data.map(id => `ids=${id}`).join('&')
  return undel(baseUri("/sys/menu/remove?"+ids ));
};
