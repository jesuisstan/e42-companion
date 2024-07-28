import { StyleSheet, SafeAreaView, Image, View } from 'react-native';

import { useTheme } from '@/contexts/ThemeContext';
import { ThemedText } from '@/components/ui/ThemedText';
import { hexToRgba } from '@/utils/color-transform';

const LogoE42companion = () => {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View
        style={{
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
          borderRadius: 10,
          backgroundColor: hexToRgba(theme.C42_ORANGE, 0.7)
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
