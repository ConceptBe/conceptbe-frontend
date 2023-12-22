// import basicSsl from '@vitejs/plugin-basic-ssl';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
// import mkcert from 'vite-plugin-mkcert';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // basicSsl(),
    // mkcert(),
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    svgr(),
  ],
  server: {
    // https: true,
    port: 3020,
    proxy: {
      // 경로가 "/api" 로 시작하는 요청을 대상으로 proxy 설정
      '/api': {
        // 요청 전달 대상 서버 주소 설정
        target: 'http://15.164.242.20',
        // 요청 헤더 host 필드 값을 대상 서버의 호스트 이름으로  변경
        changeOrigin: true,
        // 요청 경로에서 '/api' 제거
        // rewrite: (path) => path.replace(/^\/api/, ''),
        // SSL 인증서 검증 무시
        secure: false,
        // WebSocket 프로토콜 사용
        ws: true,
      },
    },
    // proxy: {
    //   '/api': {
    //     target: 'http://15.164.242.20', // the target server you want to proxy to
    //     changeOrigin: true,
    //     // rewrite: (path) => path.replace(/^\/api/, '/'), // remove the /api prefix before forwarding the request
    //   },
    // },
    // proxy: {
    //   '/api': 'http://15.164.242.20',
    // },
    // proxy: {
    //   '/auth': {
    //     // target: 'http://15.164.242.20',
    //     target: 'http://15.164.242.20',
    //     changeOrigin: true,
    //   },
    // },
  },
});
