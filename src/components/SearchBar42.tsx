import * as React from 'react';
import { SearchBar } from '@rneui/base';
import { C42_GREY } from '@/style/Colors';

const SearchBar42 = ({ placeholder }: { placeholder?: string }) => {
  const [value, setValue] = React.useState('');
  console.log('value', value); // debug

  return (
    <SearchBar
      platform="android"
      containerStyle={{}}
      inputContainerStyle={{}}
      inputStyle={{}}
      leftIconContainerStyle={{}}
      rightIconContainerStyle={{}}
      onChangeText={(newVal) => setValue(newVal)}
      //onClearText={() => console.log(onClearText())}
      placeholder={placeholder}
      placeholderTextColor={C42_GREY}
      //showLoading
      //loadingProps={{}}
      //onCancel={() => console.log(onCancel())}
      value={value}
      onSubmitEditing={() => console.log('onSubmitEditing')}
    />
  );
};

export default SearchBar42;
