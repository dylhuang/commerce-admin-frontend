import { baseUri, post,get,undel} from "@/utils/http";

function baseUrlApi(str) {
  return `/api${str}`;
}

export const getList = (data) => {
  return post(baseUrlApi("/sys/role/pageList"), data);
};

export const addItem = (data) => {
  return post(baseUrlApi("/sys/role/add"), data);
};

export const getItem = (data) => {
  return get(baseUri("/sys/role/fetchDetail"), data);
};

export const updateItem = (data) => {
  return post(baseUrlApi("/sys/role/edit"), data);
};

export const delItem = (data) => {
  const ids = data.map(id => `ids=${id}`).join('&')
  return undel(baseUri("/sys/menu/remove?"+ids ));
};
export const getTree = (data) => {
  return post(baseUrlApi("/sys/menu/treeList"), data);
};
