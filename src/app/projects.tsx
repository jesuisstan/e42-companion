import React from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  FlatList,
  Text
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { usePeer } from '@/contexts/PeerContext';
import { defineCoalition } from '@/utils/define-coalition';
import { ThemedText } from '@/components/ui/ThemedText';
import ButtonLoading from '@/components/ui/ButtonLoading';
import { hexToRgba } from '@/utils/color-transform';
import { List } from 'react-native-paper';
import Spinner from '@/components/ui/Spinner';

const ProjectsScreen = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const { peer, coalitions, projects } = usePeer();

  const renderList = ({ item }: { item: any }) => {
    console.log(item);
    return (
      <List.Item
        title={item.project.name}
        description={item.project.slug}
        right={(props) => (
          <>
            {item.validated ? (
              <Text
                style={{
                  fontSize: 10,
                  color: item.validated ? theme.C42_GREEN : theme.C42_RED,
                  margin: 'auto'
                }}
              >
                {item.final_mark} {item.status}
              </Text>
            ) : (
              <Spinner size={10} />
            )}
          </>
        )}
        style={{ borderBottomWidth: 0.1, borderColor: theme.C42_ORANGE }}
        titleStyle={{ color: theme.C42_TEXT }}
        descriptionStyle={{ fontSize: 10, color: theme.C42_GREY }}
      />
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: theme.C42_BACKGROUND, flex: 1 }}>
      <ImageBackground
        source={{ uri: defineCoalition(coalitions).cover_url }}
        style={styles.bgImage}
      >
        <View style={styles.basicContainer}>
          {/* TITLE */}
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

          {/* PROJECTS LIST */}
          {/*<ScrollView
            contentContainerStyle={[
              styles.scrollContainer,
              { backgroundColor: hexToRgba(theme.C42_BACKGROUND, 0.7) }
            ]}
          >*/}
          {/*<ThemedText>{JSON.stringify(projects, null, 1)}</ThemedText>*/}
          {/*<SafeAreaView style={[
              styles.scrollContainer,
              { backgroundColor: hexToRgba(theme.C42_BACKGROUND, 0.7) }
            ]}>*/}
          {projects ? (
            <FlatList
              data={projects}
              renderItem={renderList}
              //keyExtractor={(item) => item.id}
            />
          ) : (
            <ThemedText
              type="defaultSemiBold"
              style={{ color: theme.C42_TEXT }}
            >
              Projects' list is unavailable yet
            </ThemedText>
          )}
          {/*</SafeAreaView>*/}
          {/*</ScrollView>*/}

          {/* NAVIGATION */}
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
