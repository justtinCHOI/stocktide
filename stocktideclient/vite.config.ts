import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import path from 'path'

export default defineConfig({
  base:'', //  디폴트: '/'
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
      '@locales': path.resolve(__dirname, './src/locales'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@router': path.resolve(__dirname, './src/router'),
      '@slices': path.resolve(__dirname, './src/slices'),
      '@store': path.resolve(__dirname, './src/store'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@typings': path.resolve(__dirname, './src/typings'),
      '@utils': path.resolve(__dirname, './src/utils'),
    }
  },

  // 번들 크기를 제한하면 문제가 빌드시 오류가 뜸
  // build: {
  //   rollupOptions: {
  //     output: {
  //       // 번들 크기 제한 조정
  //       manualChunks(id) {
  //         // node_modules 라이브러리를 vendor 청크로 분리
  //         if (id.includes('node_modules')) {
  //           // 주요 라이브러리별로 세부 청크 분리 가능
  //           if (id.includes('react')) return 'react';
  //           if (id.includes('redux')) return 'redux';
  //           if (id.includes('axios')) return 'axios';
  //           if (id.includes('echarts')) return 'echarts';
  //
  //           return 'vendor';
  //         }
  //
  //         // 대용량 컴포넌트나 라우트는 동적 임포트 고려
  //         if (id.includes('pages/')) {
  //           const pageName = id.split('/').pop()?.split('.')[0];
  //           return `page-${pageName}`;
  //         }
  //       },
  //       // 청크 크기 경고 임계값 조정 (기본 500kb)
  //     }
  //   },
  //   // 소스맵 생성 옵션
  //   chunkSizeWarningLimit: 1100,
  //   sourcemap: true,
  // }
})