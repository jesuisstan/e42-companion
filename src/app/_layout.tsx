import 'react-native-reanimated';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as ScreenOrientation from 'expo-screen-orientation';

import { PeerProvider } from '@/contexts/PeerContext';
import { NetworkProvider } from '@/contexts/NetworkContext';
import Companion42App from '@/components/Companion42App';
import { ThemeProvider } from '@/contexts/ThemeContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [loaded] = useFonts({
    DMSans: require('../../assets/fonts/DMSans-Regular.ttf')
  });

  useEffect(() => {
    // Set the initial screen orientation to allow all orientations
    ScreenOrientation.unlockAsync();

    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <NetworkProvider>
        <PeerProvider>
          <Companion42App />
        </PeerProvider>
      </NetworkProvider>
    </ThemeProvider>
  );
};

export default RootLayout;
