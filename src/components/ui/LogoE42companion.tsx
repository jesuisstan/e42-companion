import { StyleSheet, SafeAreaView, Image, View } from 'react-native';

import { ThemedText } from '@/components/ui/ThemedText';

const LogoE42companion = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View
        style={{
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <ThemedText type="title">E</ThemedText>
          <Image
            style={styles.logo}
            source={require('../../../assets/images/ecole-42.png')}
          />
        </View>
        <ThemedText type="title">companion</ThemedText>
      </View>
    </SafeAreaView>
  );
};

export default LogoE42companion;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  logo: {
    width: 100,
    height: 100
  }
});
