import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import path from 'path';
export default defineConfig({
    plugins: [
        react(),
        visualizer({
            filename: './dist/stats.html',
            open: true,
            gzipSize: true
        })
    ],
    define: {
        global: 'window',
    },
    server: {
        port: 5173,
        proxy: {
            '/ws-stocktide': {
                target: process.env.VITE_WS_URL,
                ws: true,
                changeOrigin: true
            },
            '/api': {
                target: process.env.VITE_API_URL,
                changeOrigin: true,
                secure: false,
                // ws: true,
                // rewrite: (path) => path.replace(/^\/api/, '')
            }
        },
        cors: true,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src/'),
            '@api': path.resolve(__dirname, './src/api'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@components': path.resolve(__dirname, './src/components'),
            '@hooks': path.resolve(__dirname, './src/hooks'),
            '@layouts': path.resolve(__dirname, './src/layouts'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@router': path.resolve(__dirname, './src/router'),
            '@slices': path.resolve(__dirname, './src/slices'),
            '@typings': path.resolve(__dirname, './src/typings'),
            '@utils': path.resolve(__dirname, './src/utils'),
        }
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-router-dom'],
                    utils: ['axios', 'dayjs']
                }
            }
        },
        sourcemap: true
    }
});
