export default {
  expo: {
    name: 'e42-companion',
    slug: 'e42-companion',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'e42-companion',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#da5a51'
    },
    android: {
      package: 'com.krivtsoff.e42.companion',
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#da5a51'
      }
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png'
    },
    plugins: [
      ['expo-router'],
      ['expo-secure-store', {}] // Explicitly configure the plugin
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      router: {
        origin: false
      },
      eas: {
        projectId: '3c4c1d74-6146-49d5-8b5f-f881a36e4782'
      }
    },
    owner: 'jesuisstan'
  }
};
