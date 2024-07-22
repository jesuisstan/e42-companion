import 'react-native-reanimated';
import React, { useEffect } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Stack } from 'expo-router';

import { useUser } from '@/contexts/UserContext';
import { useNetwork } from '@/contexts/NetworkContext';
import { C42_GREEN } from '@/style/Colors';
import shootAlert from '@/utils/shoot-alert';

const Companion42App = () => {
  const { isConnected } = useNetwork();
  const { user } = useUser();

  useEffect(() => {
    if (!isConnected) {
      shootAlert('Network Error!', 'Please check your internet connection.');
    }
  }, [isConnected]);

  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={C42_GREEN}
        barStyle="dark-content"
        showHideTransition="slide"
        hidden={false}
      />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  }
});

export default Companion42App;
