import { StyleSheet, Image, View } from 'react-native';
import { Header } from '@rneui/themed';

import { useUser } from '@/contexts/UserContext';
import ButtonLogOut from '@/components/ButtonLogOut';
import { ThemedText } from '@/components/ui/ThemedText';
import { C42_GREEN } from '@/style/Colors';

const Companion42Header = () => {
  const { user } = useUser();

  return (
    <Header
      containerStyle={styles.header}
      backgroundColor={C42_GREEN}
      leftComponent={
        <Image source={{ uri: user?.photoURL! }} style={styles.image} />
      }
      centerComponent={
        <View>
          <ThemedText type="defaultSemiBold" style={styles.centerComponent}>
            {user?.displayName?.split(' ')[0]}
          </ThemedText>
          <ThemedText type="subtitle" style={styles.centerComponent}>
            {user?.displayName?.split(' ')[1]}
          </ThemedText>
        </View>
      }
      rightComponent={<ButtonLogOut />}
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
  }
});

export default Companion42Header;
