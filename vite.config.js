import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        sourcemap: true,
    },
    server: {
        host: 'localhost',
        port: 3000,
        https: false,
        cors: true,
        watch: {
            usePolling: true
        }
    },
});
