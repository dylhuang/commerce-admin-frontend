// vite.config.js
import { defineConfig } from "file:///E:/yuxiu/commerce-admin-frontend/node_modules/vite/dist/node/index.js";
import vue from "file:///E:/yuxiu/commerce-admin-frontend/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import VueSetupExtend from "file:///E:/yuxiu/commerce-admin-frontend/node_modules/vite-plugin-vue-setup-extend/dist/index.mjs";
import path from "path";
import WindiCSS from "file:///E:/yuxiu/commerce-admin-frontend/node_modules/vite-plugin-windicss/dist/index.mjs";
import AutoImport from "file:///E:/yuxiu/commerce-admin-frontend/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///E:/yuxiu/commerce-admin-frontend/node_modules/unplugin-vue-components/dist/vite.mjs";
import { ElementPlusResolver } from "file:///E:/yuxiu/commerce-admin-frontend/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import svgLoader from "file:///E:/yuxiu/commerce-admin-frontend/node_modules/vite-svg-loader/index.js";
import { createSvgIconsPlugin } from "file:///E:/yuxiu/commerce-admin-frontend/node_modules/vite-plugin-svg-icons/dist/index.mjs";
var __vite_injected_original_dirname = "E:\\yuxiu\\commerce-admin-frontend";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    VueSetupExtend(),
    WindiCSS(),
    svgLoader(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      symbolId: "icon-[dir]-[name]",
      svgoOptions: {
        plugins: [
          {
            name: "removeAttrs",
            params: { attrs: ["class", "data-name", "fill", "stroke"] }
          }
        ]
      }
    })
  ],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__vite_injected_original_dirname, "src")
      }
    ]
  },
  server: {
    // 是否开启 https
    https: false,
    port: 8081,
    host: "0.0.0.0",
    hmr: true,
    hot: true,
    proxy: {
      "/api/": {
        target: "http://47.108.117.127:8081"
        // target: 'http://192.168.9.107:8081',
        // changeOrigin: true,
        // rewrite: path => path.replace(/^\/api/, ''),
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFx5dXhpdVxcXFxjb21tZXJjZS1hZG1pbi1mcm9udGVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxceXV4aXVcXFxcY29tbWVyY2UtYWRtaW4tZnJvbnRlbmRcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L3l1eGl1L2NvbW1lcmNlLWFkbWluLWZyb250ZW5kL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJztcclxuaW1wb3J0IFZ1ZVNldHVwRXh0ZW5kIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1zZXR1cC1leHRlbmQnO1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcclxuaW1wb3J0IFdpbmRpQ1NTIGZyb20gJ3ZpdGUtcGx1Z2luLXdpbmRpY3NzJztcclxuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSc7XHJcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnO1xyXG5pbXBvcnQgeyBFbGVtZW50UGx1c1Jlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJztcclxuaW1wb3J0IHN2Z0xvYWRlciBmcm9tICd2aXRlLXN2Zy1sb2FkZXInO1xyXG5pbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN2Zy1pY29ucyc7XHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgICAgdnVlKCksXHJcbiAgICAgICAgVnVlU2V0dXBFeHRlbmQoKSxcclxuICAgICAgICBXaW5kaUNTUygpLFxyXG4gICAgICAgIHN2Z0xvYWRlcigpLFxyXG4gICAgICAgIEF1dG9JbXBvcnQoe1xyXG4gICAgICAgICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIENvbXBvbmVudHMoe1xyXG4gICAgICAgICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIGNyZWF0ZVN2Z0ljb25zUGx1Z2luKHtcclxuICAgICAgICAgICAgaWNvbkRpcnM6IFtwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ3NyYy9hc3NldHMvaWNvbnMnKV0sXHJcbiAgICAgICAgICAgIHN5bWJvbElkOiAnaWNvbi1bZGlyXS1bbmFtZV0nLFxyXG4gICAgICAgICAgICBzdmdvT3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgcGx1Z2luczogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3JlbW92ZUF0dHJzJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiB7IGF0dHJzOiBbJ2NsYXNzJywgJ2RhdGEtbmFtZScsICdmaWxsJywgJ3N0cm9rZSddIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSksXHJcbiAgICBdLFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICAgIGFsaWFzOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZpbmQ6ICdAJyxcclxuICAgICAgICAgICAgICAgIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgXSxcclxuICAgIH0sXHJcbiAgICBzZXJ2ZXI6IHtcclxuICAgICAgICAvLyBcdTY2MkZcdTU0MjZcdTVGMDBcdTU0MkYgaHR0cHNcclxuICAgICAgICBodHRwczogZmFsc2UsXHJcbiAgICAgICAgcG9ydDogODA4MSxcclxuICAgICAgICBob3N0OiAnMC4wLjAuMCcsXHJcbiAgICAgICAgaG1yOiB0cnVlLFxyXG4gICAgICAgIGhvdDp0cnVlLFxyXG4gICAgICAgIHByb3h5OiB7XHJcbiAgICAgICAgICAgICcvYXBpLyc6IHtcclxuICAgICAgICAgICAgICAgIHRhcmdldDogJ2h0dHA6Ly80Ny4xMDguMTE3LjEyNzo4MDgxJyxcclxuICAgICAgICAgICAgICAgIC8vIHRhcmdldDogJ2h0dHA6Ly8xOTIuMTY4LjkuMTA3OjgwODEnLFxyXG4gICAgICAgICAgICAgICAgLy8gY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgLy8gcmV3cml0ZTogcGF0aCA9PiBwYXRoLnJlcGxhY2UoL15cXC9hcGkvLCAnJyksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXdSLFNBQVMsb0JBQW9CO0FBQ3JULE9BQU8sU0FBUztBQUNoQixPQUFPLG9CQUFvQjtBQUMzQixPQUFPLFVBQVU7QUFDakIsT0FBTyxjQUFjO0FBQ3JCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsMkJBQTJCO0FBQ3BDLE9BQU8sZUFBZTtBQUN0QixTQUFTLDRCQUE0QjtBQVRyQyxJQUFNLG1DQUFtQztBQVV6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixTQUFTO0FBQUEsSUFDTCxJQUFJO0FBQUEsSUFDSixlQUFlO0FBQUEsSUFDZixTQUFTO0FBQUEsSUFDVCxVQUFVO0FBQUEsSUFDVixXQUFXO0FBQUEsTUFDUCxXQUFXLENBQUMsb0JBQW9CLENBQUM7QUFBQSxJQUNyQyxDQUFDO0FBQUEsSUFDRCxXQUFXO0FBQUEsTUFDUCxXQUFXLENBQUMsb0JBQW9CLENBQUM7QUFBQSxJQUNyQyxDQUFDO0FBQUEsSUFDRCxxQkFBcUI7QUFBQSxNQUNqQixVQUFVLENBQUMsS0FBSyxRQUFRLFFBQVEsSUFBSSxHQUFHLGtCQUFrQixDQUFDO0FBQUEsTUFDMUQsVUFBVTtBQUFBLE1BQ1YsYUFBYTtBQUFBLFFBQ1QsU0FBUztBQUFBLFVBQ0w7QUFBQSxZQUNJLE1BQU07QUFBQSxZQUNOLFFBQVEsRUFBRSxPQUFPLENBQUMsU0FBUyxhQUFhLFFBQVEsUUFBUSxFQUFFO0FBQUEsVUFDOUQ7QUFBQSxRQUNKO0FBQUEsTUFDSjtBQUFBLElBQ0osQ0FBQztBQUFBLEVBQ0w7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNMLE9BQU87QUFBQSxNQUNIO0FBQUEsUUFDSSxNQUFNO0FBQUEsUUFDTixhQUFhLEtBQUssUUFBUSxrQ0FBVyxLQUFLO0FBQUEsTUFDOUM7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUFBLEVBQ0EsUUFBUTtBQUFBO0FBQUEsSUFFSixPQUFPO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixLQUFLO0FBQUEsSUFDTCxLQUFJO0FBQUEsSUFDSixPQUFPO0FBQUEsTUFDSCxTQUFTO0FBQUEsUUFDTCxRQUFRO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFJWjtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
