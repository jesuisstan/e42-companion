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

const HomeScreen = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const initializeToken = async () => {
      try {
        const storedTokenData = await storage.load('dataToken');
        const token = storedTokenData?.access_token;
        const expiryDate =
          (storedTokenData?.created_at || 0) +
          (storedTokenData?.expires_in || 0) * 1000;

        if (!token || Date.now() >= expiryDate) {
          const newToken = await getToken();
          setToken(newToken);
        } else {
          setToken(token);
        }
      } catch (error) {
        if (error instanceof Error) {
          // Handle known error cases
          if (error.name === 'NotFoundError' || error.name === 'ExpiredError') {
            const newToken = await getToken();
            setToken(newToken);
          } else {
            console.error('Error loading token:', error.message);
          }
        } else {
          console.error('Unknown error loading token:', error);
        }
      }
    };

    initializeToken();
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
            <SearchBar42 token={token} placeholder="Find 42 peer..." />
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
    padding: 15,
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
