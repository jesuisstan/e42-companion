import { useState } from 'react';
import { View, SafeAreaView, FlatList, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { List } from 'react-native-paper';

import { useTheme } from '@/contexts/ThemeContext';
import { TProject, usePeer } from '@/contexts/PeerContext';
import { defineCoalition } from '@/utils/define-coalition';
import { ThemedText } from '@/components/ui/ThemedText';
import ButtonLoading from '@/components/ui/ButtonLoading';
import { hexToRgba } from '@/utils/color-transform';
import storage from '@/storage/storage';
import Spinner from '@/components/ui/Spinner';
import {
  formatDate,
  snakeToSpace,
  sortProjectsByDate
} from '@/utils/format-utils';
import {
  C42_GREEN_DARK,
  C42_ORANGE_DARK,
  C42_VIOLET_DARK
} from '@/style/Colors';
import Background42Image from '@/components/ui/Background42Image';

const MAX_PROJECTS =
  parseInt(process.env.EXPO_PUBLIC_FETCH_AMOUNT_OF_PROJECTS as string, 10) ||
  21;

const ProjectsScreen = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const { peer, coalitions, projects, setProjects } = usePeer();
  const [page, setPage] = useState(2); // Start from 2 as the first page is already loaded
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(
    projects.length < MAX_PROJECTS ? false : true
  ); // To track if more projects are available

  const fetchMoreProjects = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const storedTokenData = await storage.load('dataToken');
      const token = storedTokenData?.access_token;
      const response = await axios.get<TProject[]>(
        `https://api.intra.42.fr/v2/users/${peer.id}/projects_users`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { 'page[size]': MAX_PROJECTS, 'page[number]': page }
        }
      );

      const fetchedProjects = response.data;
      if (
        fetchedProjects.length === 0 ||
        fetchedProjects.length < MAX_PROJECTS
      ) {
        // No more projects or fewer projects than page size means no more pages
        setHasMore(false);
      }

      const sortedFetchedProjects = sortProjectsByDate(fetchedProjects);

      setProjects((prevProjects) => [
        ...prevProjects,
        ...sortedFetchedProjects
      ]);
      setPage(page + 1);
    } catch (error) {
      console.error('Error fetching more projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderList = ({ item }: { item: TProject }) => (
    <List.Item
      title={item.project.name}
      titleNumberOfLines={2}
      titleStyle={{ color: theme.C42_TEXT, paddingRight: 10 }}
      description={`${item.project.slug}.\nUpdated: ${formatDate(
        item.updated_at ?? item.created_at
      )}`}
      descriptionNumberOfLines={3}
      descriptionStyle={{
        fontSize: 12,
        color: C42_VIOLET_DARK,
        fontStyle: 'italic',
        paddingRight: 10,
        lineHeight: 18
      }}
      right={() => (
        <Text
          style={{
            fontSize: 13,
            color: item['validated?'] ? C42_GREEN_DARK : theme.C42_RED,
            margin: 'auto'
          }}
        >
          {snakeToSpace(item.status)} {item.final_mark}
        </Text>
      )}
      style={{
        borderWidth: 1,
        borderColor: theme.C42_ORANGE,
        backgroundColor: hexToRgba(theme.C42_BACKGROUND, 0.9)
      }}
    />
  );

  return (
    <SafeAreaView style={{ backgroundColor: theme.C42_BACKGROUND, flex: 1 }}>
      <Background42Image imgURL={defineCoalition(coalitions).cover_url}>
        <View style={styles.basicContainer}>
          <ThemedText
            type="title"
            style={[
              styles.title,
              {
                color: theme.C42_TEXT,
                backgroundColor: hexToRgba(theme.C42_BACKGROUND, 0.9),
                borderColor: theme.C42_GREEN
              }
            ]}
          >
            {peer.login} portfolio
          </ThemedText>

          {projects.length > 0 ? (
            <FlatList
              data={projects}
              renderItem={renderList}
              keyExtractor={(item) => item.id.toString()}
              onEndReached={fetchMoreProjects}
              onEndReachedThreshold={0.5}
              ListFooterComponent={
                loading ? (
                  <View style={{ margin: 10 }}>
                    <Spinner size={21} />
                  </View>
                ) : null
              }
              initialNumToRender={MAX_PROJECTS}
              maxToRenderPerBatch={MAX_PROJECTS}
            />
          ) : (
            <ThemedText
              type="defaultSemiBold"
              style={[
                styles.noProjText,
                {
                  color: theme.C42_TEXT,
                  backgroundColor: hexToRgba(theme.C42_BACKGROUND, 0.9)
                }
              ]}
            >
              Projects' list is unavailable yet
            </ThemedText>
          )}

          <View style={styles.buttons}>
            <ButtonLoading
              title="To Profile"
              onPress={() => router.push('/profile')}
              icon="person"
            />
            <ButtonLoading
              title="To Search"
              onPress={() => router.push('/')}
              icon="search"
            />
          </View>
        </View>
      </Background42Image>
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
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 15
  },
  noProjText: {
    textAlign: 'center',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    maxWidth: 600,
    width: '100%',
    borderColor: C42_ORANGE_DARK
  }
});

export default ProjectsScreen;
