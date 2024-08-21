import { defineStore } from 'pinia';
import { UPLOAD } from '@/api/common';
import { nextTick } from 'vue';
export default defineStore('common', {
    state: () => {
        return {
            isRouterAlive: true,
            sliderCollapse: false,
            tags: [{ name: '首页', routerUrl: '/index', meta: { affix: true } }],
           
            cachePages: [],
            userRouterList: [],
            subSystemList: [],
            departmentTree: [],
            wangEditorConfig: {
                toolbarConfig: {
                    toolbarKeys: [
                        'headerSelect',
                        'bold', // 加粗
                        'underline', // 下划线
                        'bulletedList', // 无序列表
                        'numberedList', // 有序列表
                        'color', // 文字颜色
                        'fontSize', // 字体大小
                        'lineHeight', // 行高
                        'uploadImage', // 上传图片
                        'delIndent', // 缩进
                        'indent', // 增进
                        'deleteImage', //删除图片
                        'divider', // 分隔线
                        'insertTable', // 插入表格
                        'justifyCenter', // 居中对齐
                        'justifyJustify', // 两端对齐
                        'justifyLeft', // 左对齐
                        'justifyRight', // 右对齐
                        'undo', // 撤销
                        'redo', // 重做
                        'clearStyle', // 清除格式
                        'fullScreen', // 全屏
                    ],
                },
                editorConfig: {
                    placeholder: '请输入内容...',
                    scroll: true,
                    MENU_CONF: {
                        uploadImage: {
                            fieldName: 'file',
                            server: UPLOAD.URL,
                            headers: {
                                Authorization: 'Bearer  ' + localStorage.getItem('token'),
                            },
                            meta: {
                                fileType: UPLOAD.FILETYPE.IMAGE,
                                type: UPLOAD.TYPE.PRODUCT,
                            },
                            maxFileSize: 3 * 1024 * 1024,
                            maxNumberOfFiles: 6,
                            allowedFileTypes: [],
                            customInsert(res, insertFn) {
                                if (res.code === 200) {
                                    insertFn(res.data.filePath, '', '');
                                } else {
                                    ElMessage.warning('上传失败');
                                }
                            },
                        },
                    },
                },
            },
            areaCityList: [],
        };
    },

    getters: {},
    actions: {
        getCommonResources() {
           
        },
        setUserRouterList(data) {
            this.userRouterList = data;
        },
        setSliderCollapse() {
            this.sliderCollapse = !this.sliderCollapse;
        },
        setTags(data) {
            this.tags = data;
        },
        removeTag(data) {
            this.tags = this.tags.filter(item => {
                return item.routerUrl !== data.routerUrl;
            });
        },
        globalRefresh() {
            this.isRouterAlive = false;
            nextTick(() => {
                this.isRouterAlive = true;
            }).then(r => {
                this.isRouterAlive = true;
            });
        },
        addTag(data) {
            this.tags.push(data);
        },
        setCathePages(data) {
            this.cachePages = data;
        },
        resetCommonStore() {
            this.tags = [{ name: '首页', routerUrl: '/index' }];
            this.cachePages = [];
        },
        
        setSubSystemList(data) {
            this.subSystemList = data;
        },
       
        setDepartmentTree(data) {
            this.departmentTree = data;
        },
        
        setTradeTypes(data) {
            this.tradeTypes = data;
        },
        setAreaCityList(data) {
            this.areaCityList = data;
        },
    },
    persist: {
        key: 'common',
        storage: sessionStorage,
    },
});
