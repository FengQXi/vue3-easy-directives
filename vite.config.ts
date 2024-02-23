import { defineConfig } from 'vite';

export default defineConfig({
    // 开发vue3库模式文档 https://cn.vitejs.dev/guide/build.html#library-mode
    build:{
        lib:{
            entry:'./src/index.ts',
            name: 'vue3-easy-directives'
        },
        // 透传一些属性给rollup
        rollupOptions:{
            // 确保外部化处理那些你不想打包进库的依赖
            external:['vue'],
            output:{
                // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                globals:{
                    "vue3EasyDirectives": 'vue3-easy-directives'
                }
            }
        }
    }
})