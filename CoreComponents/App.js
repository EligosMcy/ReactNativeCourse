import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, ImageBackground, ScrollView, Button, Pressable, Modal } from "react-native";
const logoImg = require("./assets/adaptive-icon.png");

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      {/* 第一部分：Text */}
      {/* <Text><Text style={{ color: "white", fontSize: 30 }}>Hello</Text> World</Text> */}

      {/* 第二部分：Image（本地图片 + 网络图片） */}
      {/* <Image source={logoImg} style={{ width: 100, height: 100 }} />
      <Image
        source={{ uri: "https://picsum.photos/200" }}
        style={{ width: 200, height: 200 }}
      /> */}

      {/* 第三部分：ImageBackground */}
      {/* <ImageBackground source={logoImg} style={{flex : 1}}>
        <Text>IMAGE TEXT</Text>
      </ImageBackground> */}

      {/* 第四部分: ScrollView */}
      {/* 桂满陇菜单：美化卡片 */}
      {/* <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.card}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
            <View style={[styles.bar, { backgroundColor: "#FFD700" }]} />
            <Text style={styles.title}>🍽️ 招牌菜</Text>
          </View>
          <Text style={styles.body}>
            西湖醋鱼、东坡肉、龙井虾仁、叫花鸡、宋嫂鱼羹、蜜汁火方、虾爆鳝背、干炸响铃、油焖春笋、莼菜汤、杭三鲜、千岛湖鱼头、八宝豆腐、荷叶粉蒸肉、蟹黄豆腐、桂花糖藕、杭州酱鸭、西湖莼菜羹、南宋定胜糕、桂花糯米藕、龙井茶香鸡、杭椒牛柳、糖醋排骨、红烧狮子头、清炒虾仁、杭式卤鸭、西湖莲藕汤
          </Text>
        </View>
        <View style={styles.card}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
            <View style={[styles.bar, { backgroundColor: "#FF69B4" }]} />
            <Text style={styles.title}>🧁 小吃·点心</Text>
          </View>
          <Text style={styles.body}>
            杭州小笼包、葱包桧、片儿川、猫耳朵、定胜糕、桂花糕、绿豆糕、杭州麻球、糯米烧卖、虾仁炒年糕
          </Text>
        </View>
        <View style={styles.card}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
            <View style={[styles.bar, { backgroundColor: "#90EE90" }]} />
            <Text style={styles.title}>🥒 酱腌小菜</Text>
          </View>
          <Text style={styles.body}>
            杭州酱鸭、杭州卤味、杭州酱萝卜、杭州酱黄瓜、杭州酱茄子、杭州酱豆角、杭州酱辣椒、杭州酱生姜、杭州酱蒜头、杭州酱莴笋、杭州酱芹菜、杭州酱白菜、杭州酱菠菜、杭州酱韭菜、杭州酱香菜、杭州酱茼蒿、杭州酱苋菜、杭州酱荠菜、杭州酱马兰头、杭州酱香椿、杭州酱蕨菜、杭州酱蒲公英、杭州酱苦菜、杭州酱马齿苋、杭州酱灰菜、杭州酱野葱、杭州酱野蒜、杭州酱野芹、杭州酱野苋、杭州酱野葵、杭州酱野蓼、杭州酱野荠、杭州酱野苣、杭州酱野莴
          </Text>
        </View>
        <View style={styles.card}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
            <View style={[styles.bar, { backgroundColor: "#87CEFA" }]} />
            <Text style={styles.title}>📖 招牌菜详解</Text>
          </View>
          <Text style={styles.body}>
            本店传承南宋御街千年烟火，选用当季西湖龙井、千岛湖活水鱼、天目山笋、绍兴黄酒，坚持每日凌晨三点采买、手工现做。招牌西湖醋鱼选用一斤二两草鱼，沸水煮三起三落，浇以十年陈镇江香醋与桂花糖浆，鱼肉嫩滑、酸甜如初恋；东坡肉取金华两头乌五花，黄酒与酱油文火慢炖四小时，肥而不腻入口即化；龙井虾仁只取清明前嫩芽，与手剥河虾仁清炒三秒，茶香四溢、鲜若晨露。更有宋嫂鱼羹、叫花鸡、蟹黄豆腐等三十六道经典杭帮菜，以及定胜糕、葱包桧、猫耳朵、片儿川等南宋市井小吃，配自酿青梅酒、桂花冬酿，一席江南，尽在此间。
          </Text>
        </View>
        <View style={styles.card}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
            <View style={[styles.bar, { backgroundColor: "#DDA0DD" }]} />
            <Text style={styles.title}>🎐 用餐体验</Text>
          </View>
          <Text style={styles.body}>
            堂内青砖黛瓦、曲水流觞，身着南宋服饰的掌柜与小二以拱手礼相迎，古筝轻弹、吴侬软语，仿佛穿越临安旧梦。包间名取自西湖十景：苏堤春晓、曲院风荷、平湖秋月、断桥残雪、柳浪闻莺、花港观鱼、雷峰夕照、南屏晚钟、三潭印月、双峰插云，每一道菜皆附南宋诗词，食罢赠手写菜谱与桂花书签，愿君携江南烟火而归。若遇雨天，凭窗可见雨丝斜织，烟水朦胧，掌柜会额外送上一盏桂花雨前龙井，茶香随雨雾升腾，正是“小楼一夜听春雨，深巷明朝卖杏花”的江南。来桂满陇，不止果腹，更是一场穿越八百年风雅的盛宴，一口尝尽宋韵杭风，一席写尽人间烟火。愿您乘兴而来，载兴而归，常回临安旧梦，再品桂满陇。
          </Text>
        </View>
      </ScrollView> */}

      {/* 第五部分: Button */}
      {/* <Button title="点我下单" color="#FFD700"
        onPress={() => console.log("点菜咯")}
        disabled
      /> */}

      {/*第六部分: Pressable*/}
      {/* <Pressable
        onPress={() => {
          console.log("颜色切换按钮被按下");
          // 这里可以添加关闭按钮的逻辑，比如设置状态隐藏按钮
        }}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "#FFD700" : "#1E90FF", // 按下黄色，常态蓝色
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 8,
            marginTop: 20,
            alignSelf: "center",
          },
        ]}
      >
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
          切换颜色并关闭
        </Text>
      </Pressable>
      
      <Pressable onPress = {() => console.log("点击文字,下单了")}>
        <Text style={{ color: "#df0f0fff", fontSize: 16, fontWeight: "600" }}>
          点我下单
        </Text>
      </Pressable>

      <Pressable onPress = {() => console.log("点击图片,下单了")}>
      <Image source={logoImg} style={{ width: 100, height: 100 }} />
      </Pressable> */}

      {/*第七部分: Modal弹窗*/}
      {/* <Button title="打开弹窗" color="midnightblue" onPress={() => setModalVisible(true)} />
      <Modal 
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        animationType="fade"
        presentationStyle="pageSheet"//only: IOS
      >
        <View style={{ flex: 1, backgroundColor: "#f3140c80", justifyContent: "center", alignItems: "center" }}>
          <Text>这是一个弹窗</Text>
          <Button title="关闭弹窗" color="midnightblue" onPress={() => setModalVisible(false)} />
        </View>
      </Modal> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 60,
    backgroundColor: "#f5f7fa", // 柔和浅灰背景
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 6, // Android 阴影
  },
  bar: {
    width: 4,
    height: 20,
    borderRadius: 2,
    marginRight: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
  },
  body: {
    fontSize: 15,
    lineHeight: 24,
    color: "#555",
  },
});
