import { defineStore } from 'pinia';
import { getPublicKey, userLogin, getUserNavList } from '@/api/user.js';
import { makeDynamicRoute } from '@/router/util';
import { JSEncrypt } from 'jsencrypt';
import { useCommonStoreHook } from './modules';
export default defineStore('user', {
    state: () => {
        return {
            userInfo: {},
            loginToken: '',
            menuList: [],
            unionSetting: {},
        };
    },

    getters: {},
    actions: {
        async userLoginAction(loginParam) {
            localStorage.clear();
            const res = await getPublicKey();
            const encryptor = new JSEncrypt();
            const { publicKey, sessionGenerateId } = res;
            localStorage.setItem('sessionGenerateId', sessionGenerateId);
            encryptor.setPublicKey(publicKey);
            loginParam.password = encryptor.encrypt(loginParam.password);
            const res2 = await userLogin(loginParam);
            if (res2.code === 100) {
                this.setUserInfo(res2.data);
                localStorage.setItem('loginToken', res2.data.loginToken);
                this.setToken(res2.data.loginToken);
                // await this.getUnionSetting();
                const res3 = await this.getUserMenu();
                return new Promise((resolve, reject) => {
                    resolve(res3);
                });
            } else {
                return new Promise((resolve, reject) => {
                    resolve(res2);
                    //resolve({ code: 500, msg: '登录异常' });
                    //reject("登录异常")
                });
            }
        },
        setUserInfo(info) {
            this.userInfo = info;
        },
        setToken(val) {
            this.loginToken = val;
        },
        getUserMenu() {
            return new Promise((resolve, reject) => {
                getUserNavList()
                    .then(res => {
                        if (res.code === 100) {
                            this.setUserMenuList(res.data);
                            makeDynamicRoute(res.data);
                            // 获取公共资源
                            useCommonStoreHook().getCommonResources();
                            resolve(res);
                        }
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },
        setUserMenuList(data) {
            this.menuList = data;
        },
        setUnionSetting(data) {
            this.unionSetting = data;
        },
        // async getUnionSetting() {
        //     const token = localStorage.getItem('loginToken');
        //     if (token) {
        //         const res = await getUnionSetting();
        //         if (res.code === 100 && res.data) {
        //             this.setUnionSetting(res.data);
        //         }
        //     }
        // },
    },
    persist: true,
});
