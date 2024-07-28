import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { useTheme } from '@/contexts/ThemeContext';

const ToggleThemeButton = () => {
  const { theme, themeName, toggleTheme } = useTheme();

  return (
    <View>
      <TouchableOpacity style={styles.iconButton} onPress={toggleTheme}>
        {themeName === 'dark' ? (
          <MaterialIcons name="dark-mode" size={42} color={theme.C42_ORANGE} />
        ) : (
          <MaterialIcons name="light-mode" size={42} color={theme.C42_ORANGE} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ToggleThemeButton;

const styles = StyleSheet.create({
  iconButton: {
    alignSelf: 'center',
    marginVertical: 10,
    marginHorizontal: 10
  }
});
