import { post,get,baseUri,put,undel } from "@/utils/http";

function baseUrlApi(str) {
  return `/api${str}`;
}
export const getTypeList = (data) => {
    return post(baseUrlApi("/sys/merchandise/fetchPageableServiceTypeList"), data);
  };
export const addMerchandise = (data) => {
    return post(baseUrlApi("/sys/merchandise/addMerchandise"), data);
};
export const editGoods = (data) => {
    return post(baseUrlApi("/sys/merchandise/editMerchandise"), data);
};
export const detailGoods = (data) => {
    return get(baseUri("/sys/merchandise/fetchMerchandise"), data);
};
export const deleteGoods = (data) => {
    return get(baseUri("/sys/merchandise/deleteMerchandise"), data);
};
export const ableMerchandise = (data) => {
    return get(baseUri("/sys/merchandise/ableMerchandise"), data);
};