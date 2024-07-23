import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { C42_ORANGE } from '@/style/Colors';

const ToggleThemeButton = () => {
  return (
    <View>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => console.log('Toggle theme pushed')}
      >
        <MaterialCommunityIcons
          name="theme-light-dark"
          size={42}
          color={C42_ORANGE}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ToggleThemeButton;

const styles = StyleSheet.create({
  iconButton: {
    alignSelf: 'center',
    marginVertical: 10
  }
});
