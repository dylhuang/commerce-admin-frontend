import { post,get,baseUri,put,undel } from "@/utils/http";

function baseUrlApi(str) {
  return `/api${str}`;
}
export const fetchImageList = (data) => {
    return post(baseUrlApi("/sys/global/fetchImageList"), data);
  };
export const addImage = (data) => {
    return post(baseUrlApi("/sys/global/addImage"), data);
};
export const editImage = (data) => {
    return post(baseUrlApi("/sys/global/editImage"), data);
};
export const fetchImage = (data) => {
    return get(baseUri("/sys/global/fetchImage"), data);
};
export const deleteImage = (data) => {
    return get(baseUri("/sys/global/deleteImage"), data);
};
export const ableImage = (data) => {
    return get(baseUri("/sys/global/ableImage"), data);
};