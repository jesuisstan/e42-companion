import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Button } from '@rneui/themed';
import storage from '@/storage/storage';
import { fetchProjectsData } from '@/utils/fetch-functions';
import { useTheme } from '@/contexts/ThemeContext';
import { usePeer } from '@/contexts/PeerContext';
import { sortProjectsByDate } from '@/utils/format-utils';

const ButtonLoadProjects = ({ peerId }: { peerId: number }) => {
  const router = useRouter();
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const { setProjects } = usePeer();

  const getProjects = async () => {
    setLoading(true);
    try {
      const storedTokenData = await storage.load('dataToken');
      const token = storedTokenData?.access_token;
      const { projects } = await fetchProjectsData(peerId, token!, 1); // Fetch the first page
      setProjects(sortProjectsByDate(projects));
      router.push('/projects'); // Navigate to ProjectsScreen
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      title={'Projects'}
      loading={loading}
      loadingProps={{ size: 'small', color: theme.C42_BACKGROUND }}
      titleStyle={{ fontWeight: '700', color: theme.C42_BACKGROUND }}
      buttonStyle={{
        backgroundColor: theme.C42_GREEN,
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: 5,
        paddingVertical: 10
      }}
      containerStyle={{ width: 150 }}
      onPress={getProjects}
      icon={{
        name: 'work-history',
        type: 'material-icons',
        size: 20,
        color: theme.C42_BACKGROUND
      }}
    />
  );
};

export default ButtonLoadProjects;
