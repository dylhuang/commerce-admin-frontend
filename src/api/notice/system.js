import { post,get,baseUri,put,undel } from "@/utils/http";

function baseUrlApi(str) {
  return `/api${str}`;
}
export const getNoticeList = (data) => {
    return post(baseUrlApi("/sys/notice/fetchMerchandiseList"), data);
  };
export const addNotice = (data) => {
    return post(baseUrlApi("/sys/notice/addNotice"), data);
};
export const editNotice = (data) => {
    return post(baseUrlApi("/sys/notice/editNotice"), data);
};
export const detailNotice = (data) => {
    return get(baseUri("/sys/notice/fetchNotice"), data);
};
export const deleteNotice = (data) => {
    return get(baseUri("/sys/notice/deleteNotice"), data);
};