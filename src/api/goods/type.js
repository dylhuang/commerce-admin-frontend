import { post,get,baseUri,put,undel } from "@/utils/http";

function baseUrlApi(str) {
  return `/api${str}`;
}
export const getTypeList = (data) => {
    return post(baseUrlApi("/sys/merchandise/fetchPageableServiceTypeList"), data);
  };
export const addServiceType = (data) => {
    return post(baseUrlApi("/sys/merchandise/addServiceType"), data);
};
export const editType = (data) => {
    return post(baseUrlApi("/sys/merchandise/editMerchandiseServiceType"), data);
};
export const bindType = (data) => {
    return post(baseUrlApi("/sys/merchandise/bindMerchandiseService"), data);
};
export const detailType = (data) => {
    return get(baseUri("/sys/merchandise/fetchServiceType"), data);
};
export const deleteGoods = (data) => {
    return get(baseUri("/sys/merchandise/deleteMerchandise"), data);
};
export const ableMerchandise = (data) => {
    return get(baseUri("/sys/merchandise/ableMerchandise"), data);
};