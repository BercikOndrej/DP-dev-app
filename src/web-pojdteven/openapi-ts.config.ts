import { defineConfig } from '@hey-api/openapi-ts';

const serverDomain = import.meta.env.VITE_SERVER_DOMAIN || 'http://localhost:3000';

export default defineConfig({
  input: `${serverDomain}/openapi.json`,
  output: 'src/client',
  plugins: ['@hey-api/client-axios', '@tanstack/react-query'],
});
