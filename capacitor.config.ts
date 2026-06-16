import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.her75.app',
  appName: 'Her 75',
  webDir: 'dist',
  backgroundColor: '#fbeef2',
  plugins: {
    StatusBar: {
      style: 'LIGHT',
      backgroundColor: '#fbeef2',
    },
  },
}

export default config
