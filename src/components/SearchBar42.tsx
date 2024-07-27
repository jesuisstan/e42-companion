import * as React from 'react';
import { Platform } from 'react-native';
import { SearchBar, SearchBarProps } from '@rneui/themed';
import { useTheme } from '@/contexts/ThemeContext';
import { fetchUserData } from '@/utils/fetch-functions';
import { usePeer } from '@/contexts/PeerContext';
import { useRouter } from 'expo-router';
import { Button } from '@rneui/base';
import shootAlert from '@/utils/shoot-alert';
import { ThemedText } from './ui/ThemedText';

export type TSearchBar42Props = SearchBarProps & {
  token: string | null;
  placeholder?: string;
};

const SearchBar42 = ({ token, placeholder }: TSearchBar42Props) => {
  const router = useRouter();
  const { theme } = useTheme();
  const [value, setValue] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const { setPeer, setCoalitions } = usePeer();

  const handleChangeText = (text: string) => {
    const filteredText = text.replace(/\s/g, ''); // Allow all characters except spaces
    setValue(filteredText);
  };

  const handleSearch = async () => {
    if (!value || !token) return;

    setLoading(true);
    try {
      const { user, coalition } = await fetchUserData(value, token);
      setPeer(user);
      setCoalitions(coalition);
      router.push('/profile');
    } catch (error) {
      if (error instanceof Error) {
        shootAlert('Oops!', "User doesn't exist");
        setValue('');
      } else {
        shootAlert('Error!', 'An unknown error occurred');
        setValue('');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SearchBar
        platform={Platform.OS === 'ios' ? 'ios' : 'android'}
        containerStyle={{
          backgroundColor: theme.C42_BACKGROUND,
          borderBottomWidth: 0,
          borderTopWidth: 0,
          padding: 0
        }}
        inputContainerStyle={{ backgroundColor: theme.C42_BACKGROUND }}
        inputStyle={{ color: theme.C42_TEXT }}
        leftIconContainerStyle={{
          backgroundColor: theme.C42_MUTED,
          borderRadius: 50,
          width: 35,
          height: 35
        }}
        onChangeText={handleChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.C42_MUTED}
        showLoading={loading}
        loadingProps={{ color: theme.C42_GREEN }}
        value={value}
        onSubmitEditing={handleSearch}
        maxLength={8}
        disabled={loading}
      />
      <Button disabled={loading} onPress={handleSearch} color={theme.C42_GREEN}>
        Search!
      </Button>
    </>
  );
};

export default SearchBar42;
