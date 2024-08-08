import axios from 'axios';
import getAppSign from './appSign.js';
import router from '@/router/index';
import { ElLoading } from 'element-plus';
import apiLoadingList from '@/config/loadingApi.js';

export function baseUri(str) {
    return `/api${str}`;
}

const request = axios.create({
    // baseURL: '',
    timeout: 80000,
    withCredentials: false, // 异步请求携带cookie
    headers: {
        appKey: 'ADMIN-PC',
        'Content-Type': 'application/json',
    },
});

let loadingInstance = null;

// request拦截器
request.interceptors.request.use(
    config => {
        const loginToken = localStorage.getItem('loginToken');
        config.headers['loginToken'] = loginToken;
        const sessionGenerateId = localStorage.getItem('sessionGenerateId');
        config.headers['sessionGenerateId'] = sessionGenerateId;
        const timestamp = new Date().getTime();
        config.headers['timestamp'] = timestamp;
        const randomId = Math.random().toString(36).substring(2, 10);
        config.headers['randomId'] = randomId;
        config.headers['appSign'] = getAppSign(timestamp, randomId);
        if (apiLoadingList.includes(config.url)) {
            loadingInstance = ElLoading.service({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)',
            });
        }
        return config;
    },
    error => {
        // 对请求错误做些什么
        Promise.reject(error);
    }
);

// response 拦截器
request.interceptors.response.use(
    response => {
        const whiteList = ['/api/common/shop/publicKey'];
        const requestUrl = response.config.url;
        const arrown = whiteList.some(v => requestUrl.indexOf(v) > -1);
        const result = response.data;
        if (arrown) {
            return result;
        }
        if (result && result.code !== 100) {
            if (result.code === 102) {
                const logining = localStorage.getItem('logining');
                if (logining) return;
                localStorage.setItem('logining', true);
                localStorage.removeItem('loginToken');
                localStorage.removeItem('userRouterList');
                localStorage.removeItem('routerPathList');
                ElMessage({
                    message: '登录已失效，请重新登录',
                    type: 'error',
                });
                router.push('/login');
            } else {
                ElMessage({
                    message: result.msg,
                    type: 'error',
                });
            }
        }
        if (loadingInstance) {
            loadingInstance.close();
        }
        return result;
    },
    error => {
        if (loadingInstance) {
            loadingInstance.close();
        }
        // 对响应错误做点什么
        return Promise.reject(error);
    }
);

// get请求
export function get(url, data = {}) {
    return new Promise((resolve, reject) => {
        request
            .get(url, {
                params: data,
            })
            .then(response => {
                resolve(response);
            })
            .catch(err => {
                reject(err);
            });
    });
}

// post请求
export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        request.post(url, data).then(
            response => {
                resolve(response);
            },
            err => {
                reject(err);
            }
        );
    });
}
// fileUpload
export function fileUpload(url, params = {}) {
    return new Promise((resolve, reject) => {
        request({
            url: url,
            method: 'post',
            data: params,
            headers: { 'Content-Type': 'multipart/form-data' },
        })
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
    });
}
