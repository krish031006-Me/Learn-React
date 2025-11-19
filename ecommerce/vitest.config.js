/* For performing integration test we need to have a seperate file or a seperate environment other than our normal web apps*/
// This below is the setup code
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './setupTests.js',
  }
});