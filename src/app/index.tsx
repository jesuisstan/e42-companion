import { useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  View
} from 'react-native';

import SearchBar42 from '@/components/SearchBar42';
import ThemedView from '@/components/ui/ThemedView';
import InfoModal from '@/components/InfoModal';
import ToggleThemeButton from '@/components/ui/ToggleThemeButton';
import { getToken } from '@/utils/fetch-functions';
import storage from '@/storage/storage';
import LogoE42companion from '@/components/ui/LogoE42companion';
import shootAlert from '@/utils/shoot-alert';

const HomeScreen = () => {
  const [token, setToken] = useState<string | null>(null);

  // mechanism to refresh the token proactively before it expires (1 minute margin)
  useEffect(() => {
    let timerId: any;
    const initializeToken = async () => {
      try {
        const storedTokenData = await storage.load('dataToken');
        const token = storedTokenData?.access_token;
        const expiryDate =
          (storedTokenData?.created_at || 0) +
          (storedTokenData?.expires_in || 0) * 1000;
        const margin = 60 * 1000; // 1 minute margin

        if (!token || Date.now() >= expiryDate - margin) {
          const newToken = await getToken();
          setToken(newToken);
        } else {
          setToken(token);
          const timeToExpiry = expiryDate - Date.now();
          timerId = setTimeout(async () => {
            const newToken = await getToken();
            setToken(newToken);
          }, timeToExpiry - margin);
        }
      } catch (error) {
        shootAlert(
          'Error',
          'Failed to initialize token. Please try again later.'
        );
      }
    };

    initializeToken();

    return () => clearTimeout(timerId);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require('../../assets/images/background.jpg')}
        style={styles.bgImage}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <ThemedView style={styles.centeredView}>
            <LogoE42companion />
            <SearchBar42 token={token} placeholder="find 42 peer..." />
            <View style={styles.rowView}>
              <InfoModal />
              <ToggleThemeButton />
            </View>
          </ThemedView>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  logo: {
    width: 100,
    height: 100
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15
  },
  centeredView: {
    alignItems: 'center',
    width: '80%',
    paddingBottom: 20,
    gap: 42
  },
  bgImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
  rowView: { flexDirection: 'row', gap: 42 }
});
