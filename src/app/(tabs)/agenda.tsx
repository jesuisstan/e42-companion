//import { useEffect, useState } from 'react';
//import {
//  StyleSheet,
//  ScrollView,
//  View,
//  SafeAreaView,
//  useWindowDimensions,
//  Text
//} from 'react-native';

//import Spinner from '@/components/ui/Spinner';
//import { C42_GREY, C42_ORANGE } from '@/style/Colors';

//const AgendaScreen = () => {
//  const [loading, setLoading] = useState(true); // todo
//  const { height: windowHeight, width: windowWidth } = useWindowDimensions();

//  const isLandscape = windowWidth > windowHeight || windowHeight < 400;

//  return (
//    <SafeAreaView
//      style={[
//        styles.container,
//        { flexDirection: isLandscape ? 'row' : 'column' }
//      ]}
//    >
//      <View style={isLandscape ? styles.calendarContainerLandscape : null}>
//        <Text>AgendaScreen</Text>
//      </View>
//      {loading ? (
//        <View style={styles.spinnerContainer}>
//          <Spinner size={42} />
//        </View>
//      ) : (
//        <ScrollView contentContainerStyle={styles.scrollContent}>
//          <Text>AgendaScreen1</Text>
//          <Text>AgendaScreen2</Text>
//          <Text>AgendaScreen3</Text>
//        </ScrollView>
//      )}
//    </SafeAreaView>
//  );
//};

//export default AgendaScreen;

//const styles = StyleSheet.create({
//  container: {
//    flex: 1
//  },
//  scrollContent: {
//    paddingHorizontal: 18,
//    paddingBottom: 18
//  },
//  spinnerContainer: {
//    flex: 1,
//    justifyContent: 'center',
//    alignItems: 'center',
//    marginTop: 18
//  },
//  calendarPortrait: {
//    borderWidth: 1,
//    borderColor: C42_GREY,
//    borderRadius: 10,
//    marginBottom: 15,
//    alignSelf: 'center',
//    width: '90%'
//  },
//  calendarLandscape: {
//    transform: [{ scale: 0.6 }],
//    alignSelf: 'center',
//    borderWidth: 0,
//    borderRadius: 10,
//    marginBottom: 15
//  },
//  calendarContainerLandscape: {
//    flex: 1,
//    justifyContent: 'center',
//    alignItems: 'center'
//  }
//});

import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import storage from '@/storage/storage';
import axios from 'axios';
import { Token } from '@/storage/storage';

const UID = process.env.EXPO_PUBLIC_42_UID;
const CLIENT = process.env.EXPO_PUBLIC_42_SECRET;

const AgendaScreen = () => {
  const [text, setValue] = useState('');
  const [load, setLoad] = useState(false);
  const [token, setToken] = useState<string>('');

  const getToken = () => {
    console.log('New TOKEN');
    axios
      .post(
        'https://api.intra.42.fr/oauth/token',
        {
          grant_type: 'client_credentials',
          client_id: UID,
          client_secret: CLIENT
        },
        { timeout: 2000 }
      )
      .then(async (tk) => {
        const tokenData: Token = tk.data;
        setToken(tokenData.access_token);
        await storage.save('dataToken', tokenData);
      });
  };
  console.log('AgendaScreen, token:', token); // debug
  useEffect(() => {
    async function fetchToken() {
      try {
        const data = (await storage.load('dataToken')) as Token | null;
        const token = data?.access_token;
        const expiryDate = (data?.created_at + data?.expires_in) * 1000;
        if (!token || !expiryDate || Date.now() >= expiryDate) getToken();
        else setToken(token);
      } catch (error) {
        if (error.name === 'NotFoundError' || error.name === 'ExpiredError')
          getToken();
        console.log(error);
      }
    }
    fetchToken();
  }, []);

  const ft_search = () => {
    setLoad(true);
    if (text)
      axios
        .get('https://api.intra.42.fr/v2/users/' + text.toLocaleLowerCase(), {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((rs) => {
          axios
            .get(
              'https://api.intra.42.fr/v2/users/' + rs.data.id + '/coalitions',
              {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }
            )
            .then((coalition) => {
              //console.log('rs', rs.length);
              //set({ result: rs?.data, coalition: coalition?.data });
              //navigation.navigate('Profile');
              console.log('rs', JSON.stringify(rs, null, 2));
              //console.log('coalition', JSON.stringify(coalition.data, null, 2));

            });
        })
        .catch(() => {
          setLoad(false);
          alert('User Dosnt exist');
        });
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#FEF5ED', flex: 1 }}>
      <View style={styles.sousContainer}>
        <Image
          style={styles.logo}
          source={require('../../../assets/images/ecole-42.png')}
        />
        {token && !load ? (
          <View style={styles.login_container}>
            <TextInput
              placeholder="Login.."
              style={[
                styles.input,
                {
                  backgroundColor: 'white',
                  color: '#292D39'
                }
              ]}
              onChangeText={(e) => setValue(e.trim())}
              value={text}
            />
            <TouchableOpacity
              onPress={ft_search}
              style={[styles.button, { backgroundColor: '#292D39' }]}
            >
              <Text style={{ color: '#ffffff' }}> Search </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ActivityIndicator size="large" color="#00ff00" />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sousContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    width: 250,
    height: 30,
    borderRadius: 1.5
  },
  logo: {
    width: 200,
    height: 200
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1.5,
    color: 'white',
    height: 30,
    margin: 'auto',
    marginTop: 20,
    padding: 8
  },
  login_container: {},
  Switch: {
    padding: 15,
    alignItems: 'flex-end'
  }
});

export default AgendaScreen;
