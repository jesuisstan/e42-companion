import 'react-native-reanimated';
import { useEffect } from 'react';
import { StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';

import { useNetwork } from '@/contexts/NetworkContext';
import shootAlert from '@/utils/shoot-alert';
import { useTheme } from '@/contexts/ThemeContext';

const Companion42App = () => {
  const { isConnected } = useNetwork();
  const { theme } = useTheme();

  useEffect(() => {
    if (!isConnected) {
      shootAlert('Network Error!', 'Please check your internet connection.');
    }
  }, [isConnected]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        //backgroundColor={C42_GREEN}
        barStyle="dark-content"
        showHideTransition="slide"
        hidden={false}
      />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="agenda"
          options={{
            title: 'Profile & Agenda',
            headerShown: true,
            headerStyle: { backgroundColor: theme.C42_BACKGROUND },
            headerTintColor: theme.C42_TEXT,
            headerTitleStyle: {
              fontSize: 15,
              fontFamily: 'DMSans'
            }
          }}
        />
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
