import { post,get,baseUri,put,undel } from "@/utils/http";

function baseUrlApi(str) {
  return `/api${str}`;
}
export const fetchProductList = (data) => {
    return post(baseUrlApi("/sys/product/fetchProductList"), data);
  };
export const addProduct = (data) => {
    return post(baseUrlApi("/sys/product/addProduct"), data);
};
export const editProduct = (data) => {
    return post(baseUrlApi("/sys/product/editProduct"), data);
};

export const fetchProduct = (data) => {
    return get(baseUri("/sys/product/fetchProduct"), data);
};
export const  deleteProduct = (data) => {
    return get(baseUri("/sys/product/deleteProduct"), data);
};
export const ableProduct = (data) => {
    return get(baseUri("/sys/product/ableProduct"), data);
};