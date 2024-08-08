import router from './index';
import { useCommonStoreHook } from '@/store/modules';
const modules = import.meta.glob('/src/pages/**/*.vue');
let routerPathList = [];

const makeRouters = arry => {
    const anysRouters = [];
    arry.forEach(data => {
        const routeRecordRaw = {
            path: data.routerUrl,
            name: data.routerUrl.substr(1).replace(/\//g, '-'),
            meta: {
                title: data.name,
                btns: data.roles,
            },
        };
        if (data.parentId > 0 || data.routerUrl === '/index') {
            routeRecordRaw.componentUrl = `/src/pages${data.routerUrl}/index.vue`;
        } else {
            routeRecordRaw.children = [];
            if (data.subMenu.length) {
                const children = makeRouters(data.subMenu);
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
        console.log('路由创建成功');
        resolve({ code: 100, msg: '路由创建成功' });
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
    console.log('routerInit');
    // 路由加载
    const token = localStorage.getItem('loginToken');
    const routerPathList = JSON.parse(localStorage.getItem('routerPathList')) || [];
    if (token && routerPathList.length) {
        return await makeDynamicRouteWithLocal();
    }
    return;
};
export { addAsyncRoutes, makeDynamicRoute, hasAuthBtn, makeDynamicRouteWithLocal, routerInit };
