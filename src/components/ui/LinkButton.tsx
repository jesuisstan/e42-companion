import { Link } from 'expo-router';
import { Pressable, Text, StyleSheet } from 'react-native';
import { C42_GREEN, C42_TEXT } from '@/style/Colors';

const LinkButton = ({ href, text }: { href: string; text: string }) => {
  return (
    <Link href={href} asChild>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>{text}</Text>
      </Pressable>
    </Link>
  );
};

export default LinkButton;

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: C42_GREEN,
    alignItems: 'center',
    margin: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: C42_TEXT
  },
  buttonText: {
    color: C42_TEXT
  }
});
