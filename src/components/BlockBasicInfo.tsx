import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { TCoalition, TPeer } from '@/contexts/PeerContext';
import { TCourse } from '@/utils/define-course';
import { ThemedText } from '@/components/ui/ThemedText';
import { SvgUri } from 'react-native-svg';
import { hexToRgba } from '@/utils/color-transform';
import { C42_ORANGE_DARK } from '@/style/Colors';
import { TCampus } from '@/utils/define-campus';

const BlockBasicInfo = ({
  peer,
  coalition,
  course,
  campus
}: {
  peer: TPeer;
  coalition: TCoalition;
  course: TCourse;
  campus: TCampus;
}) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.basicInfo,
        { backgroundColor: hexToRgba(theme.C42_BACKGROUND, 0.7) }
      ]}
    >
      <View style={styles.rowContainer}>
        <View style={styles.vertLeft}>
          <Image style={styles.avatar} source={{ uri: peer?.image.link }} />
          <ThemedText type="subtitle" style={{ color: theme.C42_TEXT }}>
            {peer?.displayname}
          </ThemedText>
          <ThemedText type="subtitle" style={{ color: theme.C42_TEXT }}>
            aka "{peer?.login}"
          </ThemedText>
        </View>
        <View style={styles.vertRight}>
          <SvgUri
            width="50"
            height="50"
            uri={coalition.image_url}
            color={coalition.color}
            fill={coalition.color}
          />
          <ThemedText type="defaultBold" style={{ color: coalition.color }}>
            {coalition.name}
          </ThemedText>
          <ThemedText style={{ color: theme.C42_TEXT }}>
            {campus.city}, {campus.country}
          </ThemedText>
          <ThemedText style={{ color: theme.C42_TEXT }}>
            Grade: <ThemedText type="value">{course.grade}</ThemedText>
          </ThemedText>
          <ThemedText style={{ color: theme.C42_TEXT }}>
            Level: <ThemedText type="value">{course.level}</ThemedText>
          </ThemedText>
          <ThemedText style={{ color: theme.C42_TEXT }}>
            Corr. points:{' '}
            <ThemedText type="value">{peer?.correction_point}</ThemedText>
          </ThemedText>
          <ThemedText style={{ color: theme.C42_TEXT }}>
            Wallet: <ThemedText type="value">{peer?.wallet}</ThemedText>
          </ThemedText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  basicInfo: {
    borderWidth: 1,
    borderColor: C42_ORANGE_DARK,
    borderRadius: 10,
    padding: 21,
    alignSelf: 'center',
    width: '100%',
    alignItems: 'center',
    maxWidth: 600
  },
  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    width: '100%'
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 100
  },
  vertRight: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    gap: 5,
    flex: 1
  },
  vertLeft: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    gap: 5,
    flex: 1
  }
});

export default BlockBasicInfo;
