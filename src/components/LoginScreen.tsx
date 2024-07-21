import 'expo-dev-client';
import { FC, useState, useEffect } from 'react';
import { StyleSheet, View, Image, Pressable } from 'react-native';

import { useUser } from '@/contexts/UserContext';
import { C42_GREEN } from '@/style/Colors';
import { ThemedText } from './ui/ThemedText';
import shootAlert from '@/utils/shoot-alert';

const LoginScreen: FC = () => {
  const { setUser } = useUser();
  //const [initializing, setInitializing] = useState(true);

  const tmpUser = {
    displayName: 'John Doe',
    photoURL: 'https://randomuser.me/api/portraits'
  };

  const onLoginButtonPress = async () => {
    try {
      console.log('Signing in...'); //todo
      setUser(tmpUser); //todo
    } catch (error: any) {
      if (error.code) {
        switch (error.code) {
          default:
            shootAlert('Oops!', 'Error signing in.');
        }
      } else {
        shootAlert('Oops!', 'Unknown error. Try again later.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/favicon.png')}
        style={{ width: 50, height: 50 }}
      />
      <ThemedText type="subtitle">Welcome to your</ThemedText>
      <ThemedText type="title">Diary Companion</ThemedText>
      <Pressable onPress={onLoginButtonPress}>
        <ThemedText type="subtitle">Sign in with 42</ThemedText>
      </Pressable>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C42_GREEN,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 21
  }
});
