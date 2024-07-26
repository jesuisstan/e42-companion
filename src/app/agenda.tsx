import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Text,
  ActivityIndicator,
  ImageBackground,
  SafeAreaView
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { usePeer } from '@/contexts/PeerContext';
import { defineCoalition } from '@/utils/define-coalition';
import { defineCourse } from '@/utils/define-course';
import { ThemedText } from '@/components/ui/ThemedText';

const AgendaScreen = () => {
  const { theme } = useTheme();
  const { peer, coalitions } = usePeer();

  return (
    <SafeAreaView style={{ backgroundColor: theme.C42_BACKGROUND, flex: 1 }}>
      <ImageBackground
        source={{ uri: defineCoalition(coalitions).cover_url }}
        style={styles.bgImage}
      >
        <View style={styles.container}>
          <ThemedText style={{ color: theme.C42_TEXT }}>
            PEER: {peer?.login}
          </ThemedText>
          <Image style={styles.logo} source={{ uri: peer?.image.link }} />
          <ThemedText style={{ color: theme.C42_TEXT }}>
            name: {peer?.displayname}
          </ThemedText>

          <ThemedText style={{ color: theme.C42_TEXT }}>
            Campus: {peer.campus[peer.campus.length - 1].city},{' '}
            {peer.campus[peer.campus.length - 1].country}
          </ThemedText>
          <ThemedText style={{ color: theme.C42_TEXT }}>
            Link: {peer?.url}
          </ThemedText>

          <ThemedText style={{ color: theme.C42_TEXT, fontFamily: 'DMSans' }}>
            email: {peer?.email}
          </ThemedText>
          <ThemedText style={{ color: theme.C42_TEXT }}>
            phone: {peer?.phone}
          </ThemedText>
          <ThemedText style={{ color: theme.C42_TEXT }}>
            Grade: {defineCourse(peer.cursus_users).grade}
          </ThemedText>
          <ThemedText style={{ color: theme.C42_TEXT }}>
            Level: {defineCourse(peer.cursus_users).level}
          </ThemedText>

          <ThemedText style={{ color: theme.C42_TEXT }}>
            Correction point: {peer?.correction_point}
          </ThemedText>
          <ThemedText style={{ color: theme.C42_TEXT }}>
            Wallet: {peer?.wallet}
          </ThemedText>
          <ThemedText style={{ color: theme.C42_TEXT }}>
            Coalition: {defineCoalition(coalitions).name}
          </ThemedText>
          {/*<Image
            style={styles.logo}
            source={{ uri: coalitions.at(-1)?.image_url }}
          />*/}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bgImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
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
