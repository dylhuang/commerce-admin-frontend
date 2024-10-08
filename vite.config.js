import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import path from 'path';
import WindiCSS from 'vite-plugin-windicss';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import svgLoader from 'vite-svg-loader';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
export default defineConfig({
    plugins: [
        vue(),
        VueSetupExtend(),
        WindiCSS(),
        svgLoader(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
        createSvgIconsPlugin({
            iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
            symbolId: 'icon-[dir]-[name]',
            svgoOptions: {
                plugins: [
                    {
                        name: 'removeAttrs',
                        params: { attrs: ['class', 'data-name', 'fill', 'stroke'] },
                    },
                ],
            },
        }),
    ],
    resolve: {
        alias: [
            {
                find: '@',
                replacement: path.resolve(__dirname, 'src'),
            },
        ],
    },
    server: {
        // 是否开启 https
        https: false,
        port: 8081,
        host: '0.0.0.0',
        hmr: true,
        hot:true,
        proxy: {
            '/api/': {
                target: 'http://47.108.117.127:8081',
                // target: 'http://192.168.9.107:8081',
                // changeOrigin: true,
                // rewrite: path => path.replace(/^\/api/, ''),
            },
        },
    },
});
