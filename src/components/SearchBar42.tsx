import * as React from 'react';
import { SearchBar } from '@rneui/base';

const SearchBar42 = () => {
  const [value, setValue] = React.useState('');

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
      placeholder="Type query here..."
      placeholderTextColor="#888"
      //showLoading
      //loadingProps={{}}
      //onCancel={() => console.log(onCancel())}
      value={value}
    />
  );
};

export default SearchBar42;
