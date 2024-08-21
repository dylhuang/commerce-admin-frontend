import { baseUri,post,get } from "@/utils/http";

function baseUrlApi(str) {
  return `/api${str}`;
}
/** 获取登录验证码 */
export const getVerificationCode = () => {
  return get(baseUri("/sys/captcha/img")) ;
};



/** 登录 */
export const userLogin = (data) => {
  return post(baseUrlApi("/sys/login"),data);
};
/** 用户信息 */
export const getUserInfo = () => {
  return get(baseUri("/sys/getUser"));
};
/** 用户导航 */
export const getUserNavList = () => {
  return get(baseUri("/sys/getRouters"));
};
export const rePassword = data => {
  return post(baseUrlApi('/admin/v6_0_0/admin/rePassword'), data);
};
