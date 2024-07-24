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
import { useTheme } from '@/contexts/ThemeContext';
import { usePeer } from '@/contexts/PeerContext';

const AgendaScreen = () => {
  const { theme } = useTheme();
  const { peer } = usePeer();

  return (
    <SafeAreaView style={{ backgroundColor: theme.C42_BACKGROUND, flex: 1 }}>
      <View style={styles.container}>
        <Text style={{ color: theme.C42_TEXT }}>PEER: {peer?.login}</Text>
        <Text style={{ color: theme.C42_TEXT }}>{peer?.email}</Text>
        <Image style={styles.logo} source={{ uri: peer?.image.link }} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 200,
    height: 200
  },
  searchContainer: {
    alignItems: 'center'
  },
  input: {
    width: 250,
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 10
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 40,
    marginTop: 20,
    paddingHorizontal: 20
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16
  }
});

export default AgendaScreen;
