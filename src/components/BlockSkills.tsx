import { View, StyleSheet } from 'react-native';
import { LinearProgress } from '@rneui/themed';

import { useTheme } from '@/contexts/ThemeContext';
import { ThemedText } from '@/components/ui/ThemedText';
import { hexToRgba } from '@/utils/color-transform';
import Collapsible from '@/components/ui/Collapsible';
import { TSkill } from '@/utils/define-course';
import { C42_ORANGE_DARK } from '@/style/Colors';

const BlockSkills = ({ skills }: { skills: TSkill[] }) => {
  const { theme } = useTheme();

  return (
    <Collapsible
      title={'Skills'}
      style={[
        styles.collapsibleSkills,
        { backgroundColor: hexToRgba(theme.C42_BACKGROUND, 0.8) }
      ]}
    >
      <View style={[styles.skillsContainer]}>
        {skills.map((skill: TSkill) => (
          <View key={`skill-${skill.id}`} style={styles.skillRow}>
            <ThemedText type="default" style={{ color: theme.C42_TEXT }}>
              {skill.name}{' '}
            </ThemedText>
            <LinearProgress
              style={{ marginVertical: 5 }}
              value={Number((skill.level / 21).toFixed(1))}
              variant="determinate"
              color={theme.C42_GREEN}
            />
            <ThemedText type="value">
              {skill.level} lvl{' '}
              <ThemedText
                type="default"
                style={{ color: theme.C42_TEXT, fontSize: 13 }}
              >
                {' '}
                ({((skill.level / 21) * 100).toFixed(1)} %)
              </ThemedText>
            </ThemedText>
          </View>
        ))}
      </View>
    </Collapsible>
  );
};

const styles = StyleSheet.create({
  collapsibleSkills: {
    borderColor: C42_ORANGE_DARK,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    maxWidth: 600,
    width: '100%'
  },
  skillsContainer: {
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: 15,
    padding: 10,
    alignSelf: 'center',
    maxWidth: 600,
    gap: 15
  },
  skillRow: {
    width: '100%'
  }
});

export default BlockSkills;
