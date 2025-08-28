import React from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet
} from 'react-native';
import { useRouter } from 'expo-router';

import Background42Image from '@/components/ui/Background42Image';
import { useTheme } from '@/contexts/ThemeContext';
import { usePeer } from '@/contexts/PeerContext';
import ButtonLoadProjects from '@/components/ButtonLoadProjects';
import ButtonLoading from '@/components/ui/ButtonLoading';
import { ThemedText } from '@/components/ui/ThemedText';
import BlockBasicInfo from '@/components/BlockBasicInfo';
import Collapsible from '@/components/ui/Collapsible';
import BlockSkills from '@/components/BlockSkills';
import { defineCoalition } from '@/utils/define-coalition';
import { defineCourse } from '@/utils/define-course';
import { TSkill } from '@/utils/define-course';
import { defineCampus } from '@/utils/define-campus';
import { hexToRgba } from '@/utils/color-transform';
import { C42_GREEN_DARK } from '@/style/Colors';

const ProfileScreen = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const { peer, coalitions } = usePeer();
  const definedCoalition = defineCoalition(coalitions);
  const definedCourse = defineCourse(peer.cursus_users);
  const definedCampus = defineCampus(peer);

  return (
    <SafeAreaView style={{ backgroundColor: theme.C42_BACKGROUND, flex: 1 }}>
      <Background42Image imgURL={definedCoalition.cover_url}>
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
              { backgroundColor: hexToRgba(theme.C42_BACKGROUND, 0.8) }
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
          {definedCourse.skills.length ? (
            <BlockSkills skills={definedCourse.skills as TSkill[]} />
          ) : null}

          {/* Projects */}
          <ButtonLoadProjects peerId={peer?.id} />

          {/* BACK TO SEARCH SCREEN */}
          <ButtonLoading
            title="To Search"
            onPress={() => router.push('/')}
            icon="arrow-left"
          />
        </ScrollView>
      </Background42Image>
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
