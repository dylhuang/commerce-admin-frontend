import { baseUri, post, get } from "@/utils/http";

function baseUrlApi(str) {
  return `/api${str}`;
}

export const UPLOAD = {
  URL: "/api/file/upload",
  FILETYPE: {
    AUDIO: "audio",
    FILE: "file",
    IMAGE: "image",
    VEDIO: "vedio",
  },
  TYPE: {
    ad: "ad",
    APP: "app",
    BANK: "bank",
    BRAND: "brand",
    CHAT: "chat",
    DOWNLOAD: "download",
    ID_CARD: "id-card",
    LICENCE: "license",
    ORDER: "order",
    PRODUCT: "product",
    PRODUCT_DESC: "productDesc",
    REVIEW: "review",
    SELLER: "seller",
    SETTLE_BILL: "settleBill",
    UMS: "ums",
    WX_DOMAIN: "wxDomain",
  },
};

export const getSubSysList = (data) => {
  return post(baseUrlApi("/admin/v6_0_0/subSystem/findAll"), data);
};

export const getDepartmentTree = () => {
  return post(baseUrlApi("/admin/v6_0_0/department/findTree"));
};

export const cacheCodeList = (data) => {
  return post(baseUrlApi("/admin/cache/findByType"), data);
};

export const findTree = (data) => {
  return post(baseUrlApi("/admin/cityArea/findTree"), data);
};


export const findListRole = (data) => {
  return post(baseUrlApi("/admin/v6_0_0/role/findListRole"), data);
};

export const getPublicKey = () => {
  return post(baseUrlApi("/common/shop/publicKey"));
};

export const codeTypeValue = (data) => {
  return post(baseUri("/admin/v6_0_0/codeTypeValue/findByType"), data);
};



