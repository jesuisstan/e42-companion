import { StyleSheet, Image, View, Pressable } from 'react-native';
import { Header } from '@rneui/themed';

import { useUser } from '@/contexts/UserContext';
import { ThemedText } from '@/components/ui/ThemedText';
import { C42_GREEN, C42_TEXT } from '@/style/Colors';
import { Ionicons } from '@expo/vector-icons';
import SearchBar42 from '@/components/SearchBar42';

const Companion42Header = () => {
  const { user } = useUser();

  return (
    <Header
      containerStyle={styles.header}
      backgroundColor={C42_GREEN}
      //leftComponent={
      //  <Image source={{ uri: user?.photoURL! }} style={styles.image} />
      //}
      centerComponent={
        //<View>
        //  <ThemedText type="defaultSemiBold" style={styles.centerComponent}>
        //    Text 1
        //  </ThemedText>
        //  <ThemedText type="subtitle" style={styles.centerComponent}>
        //    Text 2
        //  </ThemedText>
        //</View>
        <SearchBar42 />
      }
      rightComponent={
        <Pressable
          style={styles.btn}
          onPress={() => console.log('button pressed')}
        >
          <Ionicons name="exit-outline" size={35} color={C42_TEXT} />
        </Pressable>
      }
      placement="center"
    />
  );
};

const styles = StyleSheet.create({
  header: {
    //height: 100,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50
  },
  centerComponent: {
    textAlign: 'center',
    justifyContent: 'center'
  },
  btn: {
    flex: 1,
    justifyContent: 'center'
  }
});

export default Companion42Header;
