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

export const findMergeAreaTree = (data) => {
  return post(baseUrlApi("/admin/cityArea/mergeAreaQuery"), data);
};

export const findListRole = (data) => {
  return post(baseUrlApi("/admin/v6_0_0/role/findListRole"), data);
};

export const getPublicKey = () => {
  return post(baseUrlApi("/common/shop/publicKey"));
};

export const findPaymentType = (data) => {
  return post(baseUrlApi("/admin/v6_0_0/paymentType/findPaymentType"), data);
};

export const tracking = (data) => {
  return post(baseUrlApi("/admin/v6_0_0/deliveryCorp/getTracking"), data);
};

export const shippingMethodByKeyword = (data) => {
  return post(baseUrlApi("/admin/v6_0_0/shipping/method/findByKeyword"), data);
};

export const deliveryCorpByKeyword = (data) => {
  return post(baseUrlApi("/admin/v6_0_0/deliveryCorp/findByKeyword"), data);
};

export const warehouseSearchList = (data) => {
  return post(baseUri("/admin/v6_0_0/warehouse/searchList"), data);
};

export const sellerInfoSearchList = (data) => {
  return post(baseUri("/admin/v6_0_0/sellerInfo/findByKeyword"), data);
};

export const mobileAreaSearchList = (data) => {
  return post(baseUri("/system/mobileArea/search"), data);
};

export const memberSearchList = (data) => {
  return post(baseUri("/admin/v6_0_0/member/search"), data);
};

export const memberPluginList = (data) => {
  return post(baseUri("/admin/v6_0_0/member/findMemberPlugin"), data);
};

export const sendSms = (data) => {
  return post(baseUri("/admin/v6_0_0/paymentConfig/sendSms"), data);
};

export const getPlatList = () => {
  return post(baseUri("/admin/v6_0_0/sellerInfo/findByKeyword"), {
    roleType: 3,
    pageSize: 30,
    keyword: "",
  });
};

export const makeMiniCode = (data) => {
  return post(baseUri("/miniApp/qrcode/create"), data);
};

// 缓存
export const opCache = (data) => {
  return post(baseUri("/admin/cache/opCache"), data);
};

export const cacheEnum = (data) => {
  return get(baseUri("/admin/cache/getCacheEnum"), data);
};

export const cacheGroup = (data) => {
  return get(baseUri("/admin/cache/getCacheGroup"), data);
};

export const codeTypeValue = (data) => {
  return post(baseUri("/admin/v6_0_0/codeTypeValue/findByType"), data);
};

export const codeTypeValueSave = (data) => {
  return post(baseUri("/admin/v6_0_0/codeTypeValue/updateByType"), data);
};

// qrc
export const qrcQuery = (data) => {
  return post(baseUri("/admin/orc/query"), data);
};
