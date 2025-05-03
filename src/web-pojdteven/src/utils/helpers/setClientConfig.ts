import { client } from '@/client/client.gen';

const DEFAULT_TIMEOUT = 3000;

function setClientConfig() {
  const serverDomain =
    import.meta.env.VITE_SERVER_DOMAIN ?? 'http://localhost:3000';

  const getTokenFromStorage = (): string | undefined => {
    const item = localStorage.getItem('auth-storage');
    if (!item) {
      return undefined;
    }
    const storage = JSON.parse(item);
    return storage.state.token;
  };

  client.setConfig({
    auth: getTokenFromStorage,
    baseURL: serverDomain,
    timeout: DEFAULT_TIMEOUT,
  });

  // client.interceptors.request.use((config: any) => {
  //   const storage = JSON.parse(localStorage.getItem('auth-storage') ?? '');
  //   const token = storage.state.token;
  //   config.headers.Authorization = token ? `Bearer ${token}` : '';
  //   return config;
  // });
}

export default setClientConfig;
