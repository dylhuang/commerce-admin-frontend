import router from './index';
import { useCommonStoreHook } from '@/store/modules';
const modules = import.meta.glob('/src/pages/**/*.vue');
let routerPathList = [];

const makeRouters = arry => {
    const anysRouters = [];
    arry.forEach(data => {
        const routeRecordRaw = {
            path: data.path,
            name: data?.path.substr(1).replace(/\//g, '-') || '',
            meta: {
                title: data.menuName,
                // btns: data.roles,
            },
        };
        
        if ( data.parentId > 0 || data.path === '/index') {
            routeRecordRaw.componentUrl = `/src/pages${data.path}/index.vue`;
        } else {
            routeRecordRaw.children = [];
            if (data.children.length) {
                const children = makeRouters(data.children);
                routeRecordRaw.children = children;
            }
        }
        anysRouters.push(routeRecordRaw);
    });
    return anysRouters;
};

const addAsyncRoutes = (routers, parent = 'layout') => {
    routers.forEach(item => {
        if (item.componentUrl) {
            item.component = modules[item.componentUrl];
        }
        routerPathList.push(item.path);
        if (item.children && item.children.length) {
            item.children.forEach(itemChild => {
                routerPathList.push(itemChild.path);
                if (itemChild.componentUrl) {
                    itemChild.component = modules[itemChild.componentUrl];
                }
            });
        }
        if (item.name !== 'index') {
            router.addRoute(parent, item);
        }
    });
};

// 添加额外路由
const addAdditionalRouter = () => {
 // 平台商品
     if (routerPathList.includes('/goods/product')) {
        const routeRecordRaw = {
            path: '/goods/product/detail',
            name: 'product-detail',
            component: modules['/src/pages/goods/product/detail.vue'],
            meta: {
                title: '商品详情',
            },
        };
        router.addRoute('goods', routeRecordRaw);
        routerPathList.push(routeRecordRaw.path);
    }
    if (routerPathList.includes('/goods/product')) {
        const routeRecordRaw = {
            path: '/goods/product/edit',
            name: 'product-edit',
            component: modules['/src/pages/goods/product/edit.vue'],
            meta: {
                title: '商品编辑',
            },
        };
        router.addRoute('goods', routeRecordRaw);
        routerPathList.push(routeRecordRaw.path);
    }
    if (routerPathList.includes('/goods/goods')) {
        const routeRecordRaw = {
            path: '/goods/goods/detail',
            name: 'goods-detail',
            component: modules['/src/pages/goods/goods/detail.vue'],
            meta: {
                title: '产品详情',
            },
        };
        router.addRoute('goods', routeRecordRaw);
        routerPathList.push(routeRecordRaw.path);
    }

};

// 登录 生成动态路由
const makeDynamicRoute = useroute => {
    
    
    routerPathList = [];
    const anysRouters = makeRouters(useroute);
    addAsyncRoutes(anysRouters);
    addAdditionalRouter();
    useCommonStoreHook().setUserRouterList(anysRouters);
    localStorage.setItem('userRouterList', JSON.stringify(anysRouters));
    localStorage.setItem('routerPathList', JSON.stringify(routerPathList));
};

// 根据本地数据
const makeDynamicRouteWithLocal = () => {
    return new Promise((resolve, reject) => {
        const userRouterList = JSON.parse(localStorage.getItem('userRouterList'));
        const routerPathListStatic = JSON.parse(localStorage.getItem('routerPathList'));
        routerPathList = routerPathListStatic;
        addStaticRoutes(userRouterList);
        addAdditionalRouter();
        resolve({ code: 200, msg: '路由创建成功' });
    });
};
const addStaticRoutes = (routers, parent = 'layout') => {
    routers.forEach(item => {
        if (item.componentUrl) {
            item.component = modules[item.componentUrl];
        }
        if (item.children && item.children.length) {
            item.children.forEach(itemChild => {
                if (itemChild.componentUrl) {
                    itemChild.component = modules[itemChild.componentUrl];
                }
            });
        }
        if (item.name !== 'index') {
            router.addRoute(parent, item);
        }
    });
};

function getAuths() {
    return router.currentRoute.value.meta.btns;
}

function hasAuthBtn(value) {
    if (!value) return false;
    const metaAuths = getAuths() || [];
    return metaAuths.includes(value);
}

const routerInit = async () => {
    // 路由加载
    const token = localStorage.getItem('token');
    const routerPathList = JSON.parse(localStorage.getItem('routerPathList')) || [];
    if (token && routerPathList.length) {
        return await makeDynamicRouteWithLocal();
    }
    return;
};
export { addAsyncRoutes, makeDynamicRoute, hasAuthBtn, makeDynamicRouteWithLocal, routerInit };
