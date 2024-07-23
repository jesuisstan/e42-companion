import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ImageBackground
} from 'react-native';
import SearchBar42 from '@/components/SearchBar42';
import ThemedView from '@/components/ui/ThemedView';
import InfoModal from '@/components/InfoModal';
import LinkButton from '@/components/ui/LinkButton';
import ToggleThemeButton from '@/components/ui/ToggleThemeButton';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require('../../assets/images/background.jpg')}
        style={styles.image}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <ThemedView style={styles.centeredView}>
            <InfoModal />
            <SearchBar42 />
            <ToggleThemeButton />
            <LinkButton href="/agenda" text="Go to Agenda" />
          </ThemedView>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  centeredView: {
    alignItems: 'center',
    width: '80%',
    paddingBottom: 20,
    gap: 42
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  }
});
