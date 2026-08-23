import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.bookly.app',
  appName: 'Bookly',
  webDir: 'www',
  server: {
    url: 'https://bookly-edyd.hatchable.site',
    cleartext: false
  }
};

export default config;
