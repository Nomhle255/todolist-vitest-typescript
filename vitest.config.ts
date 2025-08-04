import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,              // makes describe/it available
    environment: 'jsdom',       // DOM APIs like document/window
    setupFiles: './src/tests/setupTests.ts', // path to jest-dom setup
  },
});
