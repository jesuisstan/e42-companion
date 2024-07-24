import { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions
} from 'react-native';
import { Overlay } from '@rneui/themed';
import { AntDesign } from '@expo/vector-icons';
import Collapsible from '@/components/ui/Collapsible';
import { ThemedText } from '@/components/ui/ThemedText';
import { useTheme } from '@/contexts/ThemeContext';

const InfoModal = () => {
  const { theme } = useTheme();
  const { height } = useWindowDimensions();
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View>
      <TouchableOpacity style={styles.iconButton} onPress={toggleOverlay}>
        <AntDesign name="questioncircleo" size={42} color={theme.C42_ORANGE} />
      </TouchableOpacity>
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <View
          style={[
            styles.overlayContent,
            { minHeight: 0.4 * height, backgroundColor: theme.C42_BACKGROUND }
          ]}
        >
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <ThemedText
              type="subtitle"
              style={[styles.centeredText, { color: theme.C42_TEXT }]}
            >
              Welcome to
            </ThemedText>
            <ThemedText
              type="title"
              style={[styles.centeredText, { color: theme.C42_TEXT }]}
            >
              E42 companion
            </ThemedText>
            <ThemedText type="default" style={{ color: theme.C42_TEXT }}>
              The app is helpful to:
            </ThemedText>

            <Collapsible title="Get 42 students' contacts">
              <View>
                <ThemedText style={{ color: theme.C42_TEXT }}>
                  - login
                </ThemedText>
                <ThemedText style={{ color: theme.C42_TEXT }}>
                  - email
                </ThemedText>
                <ThemedText style={{ color: theme.C42_TEXT }}>
                  - mobile
                </ThemedText>
                <ThemedText style={{ color: theme.C42_TEXT }}>
                  - location
                </ThemedText>
                <ThemedText style={{ color: theme.C42_TEXT }}>
                  - profile picture
                </ThemedText>
              </View>
            </Collapsible>
            <Collapsible title="Track 42 students' progress">
              <View>
                <ThemedText style={{ color: theme.C42_TEXT }}>
                  - level
                </ThemedText>
                <ThemedText style={{ color: theme.C42_TEXT }}>
                  - wallet
                </ThemedText>
                <ThemedText style={{ color: theme.C42_TEXT }}>
                  - skills
                </ThemedText>
              </View>
            </Collapsible>
            <Collapsible title="Check 42 students' activity">
              <View>
                <ThemedText style={{ color: theme.C42_TEXT }}>
                  - projects
                </ThemedText>
                <ThemedText style={{ color: theme.C42_TEXT }}>
                  - evaluations
                </ThemedText>
              </View>
            </Collapsible>
          </ScrollView>
        </View>
      </Overlay>
    </View>
  );
};

export default InfoModal;

const styles = StyleSheet.create({
  iconButton: {
    alignSelf: 'center',
    marginVertical: 10
  },
  overlayContent: {
    padding: 20,
    width: 300,
    gap: 10,
    margin: -9
  },
  scrollViewContent: {
    flexGrow: 1,
    gap: 10
  },
  centeredText: {
    textAlign: 'center'
  }
});
