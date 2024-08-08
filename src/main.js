import { createApp } from 'vue';
import 'normalize.css';
import './style/global.scss';
import 'virtual:windi.css';
import '@icon-park/vue-next/styles/index.css'; // 图标库
import 'animate.css';
import router from '@/router';
import { routerInit } from '@/router/util';
import { useUserStoreHook } from '@/store/modules.js';
import pinia from '@/store/index';
import directives from '@/directives';
import 'virtual:svg-icons-register';
import SvgIcon from '@/components/SvgIcon/index.vue';
import App from './App.vue';
const app = createApp(App);
// app.use(router).use(pinia).use(directives);
// app.component('svg-icon', SvgIcon);
// app.mount('#app');
const routerInitCall = async () => {
    console.log('进去main');
    await routerInit();
    app.use(router).use(pinia).use(directives);
    app.component('svg-icon', SvgIcon);
    app.mount('#app');
    // await useUserStoreHook().getUnionSetting();
};
routerInitCall();
