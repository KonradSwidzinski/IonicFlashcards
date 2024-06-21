import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'projektfiszki',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    AdvancedHttp: {
      cookieEnabled: true, // włącz obsługę ciasteczek
    }
  }
};


export default config;
