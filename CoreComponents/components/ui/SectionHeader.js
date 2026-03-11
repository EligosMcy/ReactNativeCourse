import { StyleSheet, Text, View } from "react-native";

export default function SectionHeader({ title, subtitle, right }) {
  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <Text style={styles.title}>{title}</Text>
        {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      {!!right && <View style={styles.right}>{right}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  left: {
    flex: 1,
    paddingRight: 12,
  },
  right: {
    flexShrink: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111",
  },
  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: "#666",
  },
});
