import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';

const ToggleThemeButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <View>
      <TouchableOpacity style={styles.iconButton} onPress={toggleTheme}>
        <MaterialCommunityIcons
          name="theme-light-dark"
          size={42}
          color={theme.C42_ORANGE}
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
