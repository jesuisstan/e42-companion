import { useEffect, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  SafeAreaView,
  useWindowDimensions,
  Text
} from 'react-native';

import Spinner from '@/components/ui/Spinner';
import { C42_GREY, C42_ORANGE } from '@/style/Colors';

const AgendaScreen = () => {
  const [loading, setLoading] = useState(true); // todo
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();

  const isLandscape = windowWidth > windowHeight || windowHeight < 400;

  return (
    <SafeAreaView
      style={[
        styles.container,
        { flexDirection: isLandscape ? 'row' : 'column' }
      ]}
    >
      <View style={isLandscape ? styles.calendarContainerLandscape : null}>
        <Text>AgendaScreen</Text>
      </View>
      {loading ? (
        <View style={styles.spinnerContainer}>
          <Spinner size={42} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text>AgendaScreen1</Text>
          <Text>AgendaScreen2</Text>
          <Text>AgendaScreen3</Text>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default AgendaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingBottom: 18
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18
  },
  calendarPortrait: {
    borderWidth: 1,
    borderColor: C42_GREY,
    borderRadius: 10,
    marginBottom: 15,
    alignSelf: 'center',
    width: '90%'
  },
  calendarLandscape: {
    transform: [{ scale: 0.6 }],
    alignSelf: 'center',
    borderWidth: 0,
    borderRadius: 10,
    marginBottom: 15
  },
  calendarContainerLandscape: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
