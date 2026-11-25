/**
 * Capacitor Configuration for ShebaGhor Android WebView Wrapper
 * 
 * This config is ready for Android app build later. Do NOT build full native app now.
 * 
 * To build Android app later, run:
 *   npx cap sync
 *   npx cap add android
 *   npx cap open android
 * Then build in Android Studio.
 */

import { CapConfig } from '@capacitor/cli';

const config: CapConfig = {
  appId: 'com.shebaghor.app',
  appName: 'ShebaGhor',
  webDir: 'out',
  plugins: {
    // No external plugins needed for MVP
    // Add plugins as needed for future features
  },
  server: {
    // Development server URL for testing
    // uncomment and change for development:
    // url: 'http://10.0.2.2:3000',
    cleartext: true,
  },
};

// Export for Capacitor CLI
export default config;