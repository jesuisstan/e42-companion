import * as React from 'react';
import { Platform } from 'react-native';
import { SearchBar } from '@rneui/base';
import { useTheme } from '@/contexts/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SearchBar42 = ({ placeholder }: { placeholder?: string }) => {
  const { theme } = useTheme();
  const [value, setValue] = React.useState('');

  return (
    <SearchBar
      platform={Platform.OS === 'ios' ? 'ios' : 'android'}
      containerStyle={{}}
      inputContainerStyle={{ backgroundColor: theme.C42_BACKGROUND }}
      inputStyle={{ color: theme.C42_TEXT }}
      leftIconContainerStyle={{
        backgroundColor: theme.C42_GREEN,
        borderRadius: 50,
        width: 42,
        height: 42
      }}
      rightIconContainerStyle={{
        backgroundColor: theme.C42_VIOLET,
        borderRadius: 50,
        width: 28,
        height: 28,
        paddingLeft: 1.5
      }}
      onChangeText={(newVal) => setValue(newVal)}
      //onClearText={() => console.log(onClearText())}
      placeholder={placeholder}
      placeholderTextColor={theme.C42_MUTED}
      //showLoading
      //loadingProps={{}}
      //onCancel={() => console.log(onCancel())}
      value={value}
      onSubmitEditing={() => console.log('onSubmitEditing')}
    />
  );
};

export default SearchBar42;
