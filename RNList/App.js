import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Platform, ScrollView } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import pokemonList from './data.json';

const getTypeDetails = (type) => {
  switch (type.toLowerCase()) {
    case "electric":
      return { borderColor: "#FFD700", emoji: "⚡️" };
    case "water":
      return { borderColor: "#6493EA", emoji: "💧" };
    case "fire":
      return { borderColor: "#FF5733", emoji: "🔥" };
    case "grass":
      return { borderColor: "#66CC66", emoji: "🌿" };
    case "bug":
      return { borderColor: "#9ACD32", emoji: "🐛" };
    case "normal":
      return { borderColor: "#A9A9A9", emoji: "😐" };
    case "ground":
      return { borderColor: "#D2B48C", emoji: "🌍" };
    case "poison":
      return { borderColor: "#9932CC", emoji: "☠️" };
    case "psychic":
      return { borderColor: "#FF69B4", emoji: "🔮" };
    case "fighting":
      return { borderColor: "#FF6347", emoji: "🥊" };
    case "ice":
      return { borderColor: "#87CEFA", emoji: "❄️" };
    case "ghost":
      return { borderColor: "#8A2BE2", emoji: "👻" };
    case "rock":
      return { borderColor: "#A0522D", emoji: "🪨" };
    case "flying":
      return { borderColor: "#87CEEB", emoji: "🕊️" };
    case "dragon":
      return { borderColor: "#483D8B", emoji: "🐉" };
    case "fairy":
      return { borderColor: "#FFB6C1", emoji: "🧚" };
    default:
      return { borderColor: "#A0A0A0", emoji: "❓" };
  }
};

// 自定义分隔组件
const Separator = () => (
  <View style={styles.separator}>
    <View style={styles.separatorLine} />
  </View>
);

// 自定义头部组件
const ListHeader = () => (
  <View style={styles.header}>
    <Text style={styles.headerTitle}>宝可梦列表</Text>
    <Text style={styles.headerSubtitle}>共 {pokemonList.length} 只宝可梦</Text>
  </View>
);

// 自定义空状态组件
const EmptyList = () => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyEmoji}>😢</Text>
    <Text style={styles.emptyText}>没有找到宝可梦</Text>
  </View>
);

// 自定义列表底部组件，防止列表底部被遮挡
const ListFooter = () => (
  <View style={styles.footer}>
    <Text style={styles.footerText}>已显示全部 {pokemonList.length} 只宝可梦</Text>
  </View>
);


export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>

        {/* =======================================================================
        方法一：使用 ScrollView + map 渲染列表
        特点：
        - 简单直接，适用于少量数据
        - 一次性渲染所有项目，数据量大时性能会下降
        - 需要手动处理 key（使用 pokemon.id）
        - 代码结构清晰，易于理解
        - 适合数据量小、变化不频繁的场景
        ======================================================================= */}
        {/* <ScrollView style={styles.scrollContent}>
          <View>
            {pokemonList.map((pokemon) =>
            {
              console.log(pokemon.id);
              return(
                <View style={styles.card} key={pokemon.id} >
                  <Text style={styles.cardText}>{pokemon.type}</Text>
                  <Text style={styles.cardText}>{pokemon.name}</Text>
                </View>
              );
            })}
          </View>
        </ScrollView> */}

        {/* =======================================================================
        方法二：使用 FlatList 渲染列表（推荐）
        特点：
        - 高性能，适用于大量数据
        - 虚拟列表技术，只渲染可视区域的项目
        - 内置 keyExtractor 处理唯一标识
        - 支持下拉刷新、上拉加载等功能
        - 自动优化滚动性能
        - 适合数据量大、需要滚动优化的场景
        ======================================================================= */}
        {/* <FlatList
          style={styles.scrollContent}
          data={pokemonList}
          keyExtractor={(item) => item.id.toString()}

          // 自定义分隔组件
          ItemSeparatorComponent={Separator}

          // 自定义头部组件
          ListHeaderComponent={ListHeader}

          // 自定义空状态组件
          ListEmptyComponent={EmptyList}

          // 自定义列表底部组件，防止列表底部被遮挡
          ListFooterComponent={ListFooter}

          // 优化滚动性能
          removeClippedSubviews={Platform.OS === 'android'}
          maxToRenderPerBatch={10}
          windowSize={10}
          initialNumToRender={10}
          renderItem={({ item }) => {
            const { borderColor, emoji } = getTypeDetails(item.type);

            return (
              <View style={[styles.card, { borderColor }]}>
                <View style={styles.nameContainer}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.id}>#{item.id}</Text>
                </View>

                <View style={styles.typeContainer}>
                  <View style={[styles.badge, { borderColor }]}>
                    <Text style={styles.typeEmoji}>{emoji}</Text>
                    <Text style={styles.typeText}>{item.type}</Text>
                  </View>
                </View>
              </View>
            );
          }}
          contentContainerStyle={styles.listContent}
        /> */}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    borderWidth: 2,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 2, height: 2 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  id: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  typeContainer: {
    alignItems: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  typeEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  typeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  // 分隔组件样式
  separator: {
    height: 24,
    justifyContent: 'center',
  },
  separatorLine: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 8,
  },
  // 头部组件样式
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  // 空状态样式
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  // 底部组件样式
  footer: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    marginTop: 16,
  },
  footerText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
});
