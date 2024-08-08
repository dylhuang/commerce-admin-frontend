import { Base64 } from 'js-base64';
import md5 from 'js-md5';
const APP_KEY = 'ADMIN-PC';
const PUBLIC_KEY = '94FE45257236BAF4BFF3F67985649760';
const getAppSign = (timestamp, randomId) => {
    return Base64.encode(md5(PUBLIC_KEY + APP_KEY + timestamp + randomId));
};
export default getAppSign;
