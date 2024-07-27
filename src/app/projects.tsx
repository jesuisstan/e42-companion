import React from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { usePeer } from '@/contexts/PeerContext';
import { defineCoalition } from '@/utils/define-coalition';
import { ThemedText } from '@/components/ui/ThemedText';
import ButtonLoading from '@/components/ui/ButtonLoading';
import { hexToRgba } from '@/utils/color-transform';

const ProjectsScreen = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const { peer, coalitions, projects } = usePeer();

  return (
    <SafeAreaView style={{ backgroundColor: theme.C42_BACKGROUND, flex: 1 }}>
      <ImageBackground
        source={{ uri: defineCoalition(coalitions).cover_url }}
        style={styles.bgImage}
      >
        <View style={styles.basicContainer}>
          <ThemedText
            type="title"
            style={[
              styles.title,
              {
                color: theme.C42_TEXT,
                backgroundColor: theme.C42_BACKGROUND,
                borderColor: theme.C42_GREEN
              }
            ]}
          >
            {peer.login} portfolio
          </ThemedText>
          <ScrollView
            contentContainerStyle={[
              styles.scrollContainer,
              { backgroundColor: hexToRgba(theme.C42_BACKGROUND, 0.7) }
            ]}
          >
            <ThemedText>{JSON.stringify(projects, null, 1)}</ThemedText>
          </ScrollView>

          <View style={styles.buttons}>
            <ButtonLoading
              title="Back to profile"
              onPress={() => router.push('/profile')}
            />
            <ButtonLoading
              title="Back to search"
              onPress={() => router.push('/')}
            />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  basicContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 15,
    gap: 15,
    alignItems: 'center'
  },
  title: {
    textAlign: 'center',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    maxWidth: 600,
    width: '100%'
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    padding: 15,
    gap: 15,
    alignItems: 'center',
    maxWidth: 600,
    width: '100%'
  },
  bgImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 15
    //padding: 15,
    //margin: 15
  }
});

export default ProjectsScreen;
