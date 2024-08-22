import { post,get,baseUri,put,undel } from "@/utils/http";

function baseUrlApi(str) {
  return `/api${str}`;
}
export const getTypeList = (data) => {
    return post(baseUrlApi("/sys/service/fetchPageableServiceTypeList"), data);
  };
export const addServiceType = (data) => {
    return post(baseUrlApi("/sys/service/addServiceType"), data);
};
export const editType = (data) => {
    return post(baseUrlApi("/sys/service/editMerchandiseServiceType"), data);
};
export const bindType = (data) => {
    return post(baseUrlApi("/sys/service/bindMerchandiseService"), data);
};
export const detailType = (data) => {
    return get(baseUri("/sys/service/fetchServiceType"), data);
};
export const deletefetch = (data) => {
    return get(baseUri("/sys/service/deleteServiceType"), data);
};
export const ableMerchandise = (data) => {
    return get(baseUri("/sys/service/ableMerchandise"), data);
};