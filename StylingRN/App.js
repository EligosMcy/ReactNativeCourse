import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.darkMode}>
        <Text style={styles.darkModeText}> !样式继承!
          <Text style={styles.boldText}>
            子文本会从父文本继承样式
          </Text>
        </Text>
      </View>
      <Text style={styles.title}>Start Working on Your App!</Text>
      <View style={[styles.box, styles.lightblueBg, styles.boxShadow]}>
        <Text>这是一个蓝色盒子</Text>
      </View>
      <View style={[styles.box, styles.lightgreenBg, styles.androidBoxShadow]}>
        <Text>这是一个绿色盒子</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:
  {
    fontSize: 24,
    fontWeight: "bold",
    color: "green",
  },
  darkMode:
  {
    backgroundColor: "black",
  },
  darkModeText:
  {
    color: "white",
  },
  boldText:
  {
    fontWeight: "bold",
  },
  box:
  {
    width: 200,
    height: 100,
    // alignItems: "center",
    // justifyContent: "center",
    // padding: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: "red",
    borderStyle: "dashed",
    borderRadius: 10,
  },
  lightblueBg:
  {
    backgroundColor: "lightblue",
  },
  lightgreenBg:
  {
    backgroundColor: "lightgreen",
  },
  boxShadow: {
    shadowColor: "red",
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
  },
  androidBoxShadow: {
    elevation: 10,
  },
});
