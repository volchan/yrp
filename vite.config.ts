import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import rails from 'vite-plugin-rails'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), rails(), legacy({ targets: ['defaults', 'not IE 11'] })],
})
