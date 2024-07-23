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
import { C42_TEXT, C42_BACKGROUND, C42_ORANGE } from '@/style/Colors';
import Collapsible from '@/components/ui/Collapsible';
import { ThemedText } from '@/components/ui/ThemedText';

const InfoModal = () => {
  const { height } = useWindowDimensions();
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View>
      <TouchableOpacity style={styles.iconButton} onPress={toggleOverlay}>
        <AntDesign name="questioncircleo" size={42} color={C42_ORANGE} />
      </TouchableOpacity>
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <View style={[styles.overlayContent, { minHeight: 0.4 * height }]}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <ThemedText type="subtitle" style={styles.centeredText}>
              Welcome to
            </ThemedText>
            <ThemedText type="title" style={styles.centeredText}>
              E42 companion
            </ThemedText>
            <ThemedText type="default">The app is helpful to:</ThemedText>

            <Collapsible title="Get 42 students' contacts">
              <View>
                <ThemedText>- login</ThemedText>
                <ThemedText>- email</ThemedText>
                <ThemedText>- mobile</ThemedText>
                <ThemedText>- location</ThemedText>
                <ThemedText>- profile picture</ThemedText>
              </View>
            </Collapsible>
            <Collapsible title="Track 42 students' progress">
              <View>
                <ThemedText>- level</ThemedText>
                <ThemedText>- wallet</ThemedText>
                <ThemedText>- skills</ThemedText>
              </View>
            </Collapsible>
            <Collapsible title="Check 42 students' activity">
              <View>
                <ThemedText>- projects</ThemedText>
                <ThemedText>- evaluations</ThemedText>
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
    backgroundColor: C42_BACKGROUND
  },
  scrollViewContent: {
    flexGrow: 1,
    gap: 10
  },
  centeredText: {
    textAlign: 'center'
  }
});
