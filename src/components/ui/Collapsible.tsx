import { FC, useState } from 'react';
import { StyleSheet, Pressable, type ViewProps } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { ThemedText } from '@/components/ui/ThemedText';
import ThemedView from '@/components/ui/ThemedView';
import { useTheme } from '@/contexts/ThemeContext';

type TCollapsibleProps = ViewProps & {
  title: string;
  children: React.ReactNode;
};

const Collapsible: FC<TCollapsibleProps> = ({
  style = {},
  title,
  children
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <ThemedView style={style}>
      <Pressable
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        //activeOpacity={0.8}
      >
        <Ionicons
          name={isOpen ? 'chevron-down' : 'chevron-forward-outline'}
          size={18}
          color={theme.C42_ORANGE}
        />
        <ThemedText type="defaultSemiBold" style={{ color: theme.C42_TEXT }}>
          {title}
        </ThemedText>
      </Pressable>
      {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  content: {
    marginTop: 6,
    marginLeft: 24
  }
});

export default Collapsible;
