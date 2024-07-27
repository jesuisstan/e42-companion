import React from 'react';
import {
  View,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { usePeer } from '@/contexts/PeerContext';
import { defineCoalition } from '@/utils/define-coalition';
import { defineCourse } from '@/utils/define-course';
import { ThemedText } from '@/components/ui/ThemedText';
import { SvgUri } from 'react-native-svg';
import { hexToRgba } from '@/utils/color-transform';
import { C42_GREEN_DARK, C42_ORANGE_DARK } from '@/style/Colors';
import Collapsible from '@/components/ui/Collapsible';

const ProfileScreen = () => {
  const { theme } = useTheme();
  const { peer, coalitions } = usePeer();
  const definedCoalition = defineCoalition(coalitions);

  return (
    <SafeAreaView style={{ backgroundColor: theme.C42_BACKGROUND, flex: 1 }}>
      <ImageBackground
        source={{ uri: defineCoalition(coalitions).cover_url }}
        style={styles.bgImage}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View
            style={[
              styles.basicInfo,
              { backgroundColor: hexToRgba(theme.C42_BACKGROUND, 0.7) }
            ]}
          >
            <View style={styles.rowContainer}>
              <View style={styles.vertLeft}>
                <Image
                  style={styles.avatar}
                  source={{ uri: peer?.image.link }}
                />
                <ThemedText type="subtitle" style={{ color: theme.C42_TEXT }}>
                  {peer?.displayname}
                </ThemedText>
                <ThemedText type="subtitle" style={{ color: theme.C42_TEXT }}>
                  aka "{peer?.login}"
                </ThemedText>
              </View>
              <View style={styles.vertRight}>
                <SvgUri
                  width="50"
                  height="50"
                  uri={definedCoalition.image_url}
                  color={definedCoalition.color}
                  fill={definedCoalition.color}
                />
                <ThemedText
                  type="defaultBold"
                  style={{ color: definedCoalition.color }}
                >
                  {definedCoalition.name}
                </ThemedText>
                <ThemedText style={{ color: theme.C42_TEXT }}>
                  {peer.campus[peer.campus.length - 1].city},{' '}
                  {peer.campus[peer.campus.length - 1].country}
                </ThemedText>
                <ThemedText style={{ color: theme.C42_TEXT }}>
                  Grade:{' '}
                  <ThemedText type="value">
                    {defineCourse(peer.cursus_users).grade}
                  </ThemedText>
                </ThemedText>
                <ThemedText style={{ color: theme.C42_TEXT }}>
                  Level:{' '}
                  <ThemedText type="value">
                    {defineCourse(peer.cursus_users).level}
                  </ThemedText>
                </ThemedText>
                <ThemedText style={{ color: theme.C42_TEXT }}>
                  Corr. points:{' '}
                  <ThemedText type="value">{peer?.correction_point}</ThemedText>
                </ThemedText>
                <ThemedText style={{ color: theme.C42_TEXT }}>
                  Wallet: <ThemedText type="value">{peer?.wallet}</ThemedText>
                </ThemedText>
              </View>
            </View>
          </View>

          <Collapsible
            title={'Contacts'}
            style={[
              styles.collapsible,
              { backgroundColor: hexToRgba(theme.C42_BACKGROUND, 0.7) }
            ]}
          >
            <View style={styles.card}>
              <ThemedText type="default" style={{ color: theme.C42_TEXT }}>
                Email: <ThemedText type="value">{peer?.email}</ThemedText>
              </ThemedText>
              <ThemedText type="default" style={{ color: theme.C42_TEXT }}>
                Phone: <ThemedText type="value">{peer?.phone}</ThemedText>
              </ThemedText>
            </View>
          </Collapsible>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    padding: 15,
    gap: 15,
    alignItems: 'center'
  },
  basicInfo: {
    borderWidth: 1,
    borderColor: C42_ORANGE_DARK,
    borderRadius: 10,
    padding: 21,
    alignSelf: 'center',
    width: '100%',
    alignItems: 'center',
    maxWidth: 600
  },
  bgImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    width: '100%'
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 100
  },
  vertRight: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    gap: 5,
    flex: 1
  },
  vertLeft: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    gap: 5,
    flex: 1
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
  card: {
    gap: 10,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  collapsible: {
    borderColor: C42_GREEN_DARK,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    maxWidth: 600,
    width: '100%'
  }
});

export default ProfileScreen;
