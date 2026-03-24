// 清空所有数据的脚本
// 可以在 Expo 开发环境中运行

const clearAllData = async () => {
  try {
    // 清除所有 AsyncStorage 数据
    await AsyncStorage.clear();
    console.log('✅ 所有数据已清空');
    
    // 重新加载应用
    window.location.reload();
  } catch (error) {
    console.error('❌ 清空数据失败:', error);
  }
};

// 在浏览器控制台中运行: clearAllData()
console.log('请在控制台中运行: clearAllData() 来清空所有数据');
