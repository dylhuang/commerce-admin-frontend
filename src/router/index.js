import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/layout/index.vue';
import Login from '@/pages/login.vue';
import Index from '@/pages/index/index.vue';
import Error404 from '@/pages/error/404.vue';
import { npStart, npClose } from '@/utils/nporgress';

// 路由信息
const routes = [
    {
        path: '/',
        name: 'layout',
        component: Layout,
        redirect: '/index',
        children: [
            {
                path: '/index',
                name: 'index',
                component: Index,
            },
          
        ],
    },
    // {
    //     path: '/index',
    //     name: 'index',
    //     component: Layout,
    // },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
   
    {
        path: '/404',
        name: '404',
        component: Error404,
        meta: {
            title: '404',
        },
    },
    {
        path: '/:pathMatch(.*)',
        redirect: '/404',
    },
];

// 导出路由
const router = createRouter({
    history: createWebHistory(),
    routes,
});

// export function resetRouter() {
//     //清空路由的方法
//     const newRouter = createRouter();
//     router.matcher = newRouter.matcher;
// }

console.log('加载路由文件');

export default router;

router.beforeEach(async (to, from, next) => {
    console.log('进入路由');
    npStart();
    next();
});

router.afterEach(() => {
    npClose();
});
