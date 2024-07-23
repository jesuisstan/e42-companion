import 'react-native-reanimated';
import { useEffect } from 'react';
import { StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';

import { useNetwork } from '@/contexts/NetworkContext';
import { C42_GREEN } from '@/style/Colors';
import shootAlert from '@/utils/shoot-alert';

const Companion42App = () => {
  const { isConnected } = useNetwork();
  useEffect(() => {
    if (!isConnected) {
      shootAlert('Network Error!', 'Please check your internet connection.');
    }
  }, [isConnected]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={C42_GREEN}
        barStyle="dark-content"
        showHideTransition="slide"
        hidden={false}
      />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="agenda" />
        <Stack.Screen name="+not-found" />
      </Stack>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  }
});

export default Companion42App;
