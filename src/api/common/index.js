import { baseUri, post, get } from "@/utils/http";

function baseUrlApi(str) {
  return `/api${str}`;
}

export const UPLOAD = {
  URL: "/api/sys/global/addImageToCloud",
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






