import { post,get } from "@/utils/http";

function baseUrlApi(str) {
  return `/api${str}`;
}
/** 获取登录验证码 */
export const getVerificationCode = () => {
  return get(baseUrlApi("/sys/captcha/img")) ;
};

/** 获取publicKey */
export const getPublicKey = () => {
  return post(baseUrlApi("/common/shop/publicKey"));
};

/** 登录 */
export const userLogin = (data) => {
  return post(baseUrlApi("/admin/login/submit"),data);
};
/** 用户导航 */
export const getUserNavList = () => {
  return post(baseUrlApi("/admin/menu/findNavTree"));
};
export const rePassword = data => {
  return post(baseUrlApi('/admin/v6_0_0/admin/rePassword'), data);
};
