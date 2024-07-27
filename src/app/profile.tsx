import React from 'react';
import {
  View,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { usePeer } from '@/contexts/PeerContext';
import { defineCoalition } from '@/utils/define-coalition';
import { defineCourse } from '@/utils/define-course';
import { ThemedText } from '@/components/ui/ThemedText';
import { hexToRgba } from '@/utils/color-transform';
import { C42_GREEN_DARK } from '@/style/Colors';
import Collapsible from '@/components/ui/Collapsible';
import { TSkill } from '@/utils/define-course';
import BlockSkills from '@/components/BlockSkills';
import BlockBasicInfo from '@/components/BlockBasicInfo';
import { defineCampus } from '@/utils/define-campus';
import ButtonLoadProjects from '@/components/ui/ButtonLoadProjects';

const ProfileScreen = () => {
  const { theme } = useTheme();
  const { peer, coalitions } = usePeer();
  const definedCoalition = defineCoalition(coalitions);
  const definedCourse = defineCourse(peer.cursus_users);
  const definedCampus = defineCampus(peer);

  return (
    <SafeAreaView style={{ backgroundColor: theme.C42_BACKGROUND, flex: 1 }}>
      <ImageBackground
        source={{ uri: defineCoalition(coalitions).cover_url }}
        style={styles.bgImage}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {/* Basic */}
          <BlockBasicInfo
            peer={peer}
            coalition={definedCoalition}
            course={definedCourse}
            campus={definedCampus}
          />

          {/* Contacts */}
          <Collapsible
            title={'Contacts'}
            opened={true}
            style={[
              styles.collapsible,
              { backgroundColor: hexToRgba(theme.C42_BACKGROUND, 0.7) }
            ]}
          >
            <View style={styles.contactsCard}>
              <ThemedText type="default" style={{ color: theme.C42_TEXT }}>
                Email: <ThemedText type="value">{peer?.email}</ThemedText>
              </ThemedText>
              <ThemedText type="default" style={{ color: theme.C42_TEXT }}>
                Phone: <ThemedText type="value">{peer?.phone}</ThemedText>
              </ThemedText>
            </View>
          </Collapsible>

          {/* Skills */}
          <BlockSkills skills={definedCourse.skills as TSkill[]} />

          {/* Projects */}
          <ButtonLoadProjects peerId={peer?.id} />
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    padding: 15,
    gap: 15,
    alignItems: 'center'
  },
  bgImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
  contactsCard: {
    gap: 10,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  collapsible: {
    borderColor: C42_GREEN_DARK,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    maxWidth: 600,
    width: '100%'
  }
});

export default ProfileScreen;
