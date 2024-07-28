import { Text, type TextProps, StyleSheet } from 'react-native';
import { C42_GREEN_DARK, C42_VIOLET_DARK } from '@/style/Colors';

export type ThemedTextProps = TextProps & {
  type?:
    | 'default'
    | 'title'
    | 'defaultSemiBold'
    | 'subtitle'
    | 'link'
    | 'defaultBold'
    | 'cursive'
    | 'value';
};

export function ThemedText({
  style,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  return (
    <Text
      style={[
        { fontFamily: 'DMSans' },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'defaultBold' ? styles.defaultBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'value' ? styles.value : undefined,
        type === 'cursive' ? styles.cursive : undefined,
        style
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600'
  },
  defaultBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'bold'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: C42_VIOLET_DARK
  },
  value: {
    fontSize: 16,
    lineHeight: 24,
    color: C42_GREEN_DARK,
    fontWeight: 'bold'
  },
  cursive: {
    fontSize: 16,
    lineHeight: 24,
    fontStyle: 'italic'
  }
});
