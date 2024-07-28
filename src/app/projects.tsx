import React, { useState, useEffect } from 'react';
import {
  View,
  ImageBackground,
  SafeAreaView,
  FlatList,
  Text,
  StyleSheet
} from 'react-native';
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
import { snakeToSpace } from '@/utils/format-string';
import { C42_GREEN_DARK } from '@/style/Colors';

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
    console.log('fetchMoreProjects');
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

      setProjects((prevProjects) => [...prevProjects, ...fetchedProjects]);
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
      description={item.project.slug}
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
        borderBottomWidth: 0.6,
        borderColor: theme.C42_ORANGE,
        backgroundColor: hexToRgba(theme.C42_BACKGROUND, 0.85)
      }}
      titleStyle={{ color: theme.C42_TEXT, paddingRight: 10 }}
      descriptionStyle={{
        fontSize: 12,
        color: theme.C42_TEXT,
        fontStyle: 'italic',
        paddingRight: 10
      }}
    />
  );

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
                backgroundColor: hexToRgba(theme.C42_BACKGROUND, 0.8),
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
            />
          ) : (
            <ThemedText
              type="defaultSemiBold"
              style={{ color: theme.C42_TEXT }}
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
  bgImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 15
  }
});

export default ProjectsScreen;
