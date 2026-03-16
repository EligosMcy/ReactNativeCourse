// =============================================================================
// 方法一：静态获取屏幕尺寸（不使用Hooks）
// 使用技术：Dimensions API（react-native）
// 特点：只在组件挂载时获取一次尺寸，不响应后续屏幕变化
// =============================================================================
// import { StyleSheet, Text, View, Dimensions } from 'react-native';
// 
// export default function App() {
//   const windowWidth = Dimensions.get('window').width;
//   const windowHeight = Dimensions.get('window').height;
//   console.log(windowWidth, windowHeight);
//   return (
//     <View style={styles.container}>
//       <View style={[styles.box, {
//         width: windowWidth > 500 ? "70%" : "90%",
//         height: windowHeight > 600 ? "60%" : "90%",
//       }]}>
//         <Text style={{ fontSize: windowWidth > 500 ? 50 : 24 }}>Welcome</Text>
//       </View>
//     </View>
//   );
// }
// 
// const styles = StyleSheet.create({
//   container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
//   box: { backgroundColor: 'lightblue', alignItems: 'center', justifyContent: 'center' },
// });

// =============================================================================
// 方法二：使用useState + useEffect监听屏幕变化（响应式）
// 使用技术：useState Hook、useEffect Hook、Dimensions.addEventListener
// 特点：屏幕旋转时自动更新尺寸，需要手动清理监听器
// =============================================================================
// import { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, Dimensions } from 'react-native';
// 
// export default function App() {
//   const [dimensions, setDimensions] = useState({
//     window: Dimensions.get('window'),
//   })
// 
//   useEffect(() => {
//     const subscription = Dimensions.addEventListener("change", ({ window }) => {
//       setDimensions({ window })
//     });
//     return () => subscription?.remove();
//   })
// 
//   const { window } = dimensions
//   const windowWidth = window.width;
//   const windowHeight = window.height;
// 
//   return (
//     <View style={styles.container}>
//       <View style={[styles.box, {
//         width: windowWidth > 500 ? "70%" : "90%",
//         height: windowHeight > 600 ? "60%" : "90%",
//       }]}>
//         <Text style={{ fontSize: windowWidth > 500 ? 50 : 24 }}>Welcome</Text>
//       </View>
//     </View>
//   );
// }
// 
// const styles = StyleSheet.create({
//   container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
//   box: { backgroundColor: 'lightblue', alignItems: 'center', justifyContent: 'center' },
// });

// =============================================================================
// 方法三：使用useWindowDimensions（推荐方法）
// 使用技术：useWindowDimensions Hook（react-native）
// 特点：内置Hook，自动监听屏幕变化，无需手动清理
// =============================================================================
// import { StyleSheet, View, Text, useWindowDimensions } from 'react-native';
// 
// export default function App() {
//   const windowWidth = useWindowDimensions().width;
//   const windowHeight = useWindowDimensions().height;
// 
//   return (
//     <View style={styles.container}>
//       <View style={[styles.box, {
//         width: windowWidth > 500 ? "70%" : "90%",
//         height: windowHeight > 600 ? "60%" : "90%",
//       }]}>
//         <Text style={{ fontSize: windowWidth > 500 ? 50 : 24 }}>Welcome</Text>
//       </View>
//     </View>
//   );
// }
// 
// const styles = StyleSheet.create({
//   container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
//   box: { backgroundColor: 'lightblue', alignItems: 'center', justifyContent: 'center' },
// });

// =============================================================================
// 方法四：SafeAreaView + Platform（处理安全区域和平台差异）
// 使用技术：SafeAreaProvider、SafeAreaView（react-native-safe-area-context）
//         Platform API、Platform.select（react-native）
// 特点：适配iOS刘海屏/Android状态栏，区分iOS和Android的样式
// =============================================================================
// import { StyleSheet, View, Text, Platform } from 'react-native';
// import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
// 
// export default function App() {
//   return (
//     <SafeAreaProvider>
//       <SafeAreaView style={styles.safeContainer}>
//         <View style={styles.container}>
//           <View style={styles.box}>
//             <Text style={styles.text}>Welcome</Text>
//           </View>
//         </View>
//       </SafeAreaView>
//     </SafeAreaProvider>
//   );
// }
// 
// const styles = StyleSheet.create({
//   safeContainer: { flex: 1 },
//   container: { flex: 1, backgroundColor: 'plum', paddingTop: Platform.OS === 'ios' ? 15 : 0 },
//   box: { padding: 20 },
//   text: {
//     ...Platform.select({
//       ios: { color: 'red', fontSize: 24, fontStyle: 'italic' },
//       android: { color: 'blue', fontSize: 20 },
//     }),
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
// });

// =============================================================================
// 当前运行代码：SafeAreaView + Platform + 自定义组件
// 使用技术：
//   - SafeAreaProvider、SafeAreaView（react-native-safe-area-context）处理安全区域
//   - Platform API（react-native）检测当前运行平台
//   - Platform.select（react-native）根据平台返回不同样式
//   - CustomButton（自定义组件）处理按钮交互
// =============================================================================

import { StyleSheet, View, Text, Platform } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from './components/CustomButton/CustomButton';

export default function App() {

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          <View style={styles.box}>
            <Text style={styles.text}>Welcome</Text>
            <CustomButton text="Click me" onPress={() => alert("Button pressed")} />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: 'plum' },
  container: { flex: 1, backgroundColor: 'plum', paddingTop: Platform.OS === 'ios' ? 15 : 0 },
  box: { padding: 20 },
  text: {
    ...Platform.select({
      ios: { color: 'red', fontSize: 24, fontStyle: 'italic' },
      android: { color: 'blue', fontSize: 20 },
    }),
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
