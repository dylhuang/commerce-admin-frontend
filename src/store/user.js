import { defineStore } from 'pinia';
import {  userLogin, getUserNavList } from '@/api/user.js';
import { makeDynamicRoute } from '@/router/util';
import { JSEncrypt } from 'jsencrypt';
import { useCommonStoreHook } from './modules';
export default defineStore('user', {
    state: () => {
        return {
            userInfo: {},
            token: '',
            menuList: [],
            unionSetting: {},
        };
    },

    getters: {},
    actions: {
        async userLoginAction(loginParam) {
            localStorage.clear();
            const res2 = await userLogin(loginParam);
            if (res2.code === 200) {
                this.setUserInfo(res2.data);
                localStorage.setItem('token', res2.data.token);
                this.setToken(res2.data.token);
                const res3 = await this.getUserMenu();
                return new Promise((resolve, reject) => {
                    resolve(res3);
                });
            } else {
                return new Promise((resolve, reject) => {
                    resolve(res2);
                });
            }
        },
        setUserInfo(info) {
            this.userInfo = info;
        },
        setToken(val) {
            this.token = val;
        },
        getUserMenu() {
            return new Promise((resolve, reject) => {
                getUserNavList()
                    .then(res => {
                        if (res.code === 200) {
                            this.setUserMenuList(res.data);
                            makeDynamicRoute(res.data);
                            // 获取公共资源
                            // useCommonStoreHook().getCommonResources();
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
        //     const token = localStorage.getItem('token');
        //     if (token) {
        //         const res = await getUnionSetting();
        //         if (res.code === 200 && res.data) {
        //             this.setUnionSetting(res.data);
        //         }
        //     }
        // },
    },
    persist: true,
});
