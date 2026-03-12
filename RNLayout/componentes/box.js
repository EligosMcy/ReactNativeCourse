import { StyleSheet, Text, View } from 'react-native';

export default function Box({ title = 'Box', style, textStyle }) {
  return (
    <View style={[styles.box, style]}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </View>
  );
}

export const styles = StyleSheet.create({
  box: {
    backgroundColor: '#1E90FF',
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});
