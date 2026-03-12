import { StyleSheet, View } from 'react-native';
import Box from './componentes/box';

export default function App() {
  return (
    <View style={styles.container}>
      {/* alignItems vs alignSelf
          - alignItems: 写在父容器上, 统一控制所有子元素在交叉轴上的对齐
          - alignSelf: 写在某个子元素上, 单独覆盖该元素的对齐方式
      */}
      {/* <Box title="Hello Box 1" style={{ backgroundColor: '#0B3D91', alignSelf: 'flex-end' }} />
          <Box title="Hello Box 2" style={{ backgroundColor: '#8B0000', alignSelf: 'flex-start' }} />
          <Box title="Hello Box 3" style={{ backgroundColor: '#006400', alignSelf: 'center' }} />
          <Box title="Hello Box 4" style={{ backgroundColor: '#B8860B', alignSelf: 'stretch' }} />
          <Box title="Hello Box 5" style={{ backgroundColor: '#4B0082', alignSelf: 'auto' }} /> */}

      {/* flexBasis vs height
          - height: 永远只控制“高度”
          - flexBasis: 控制 flex 主轴方向上的“基准尺寸”
              - flexDirection: 'column'(默认) -> 更像“高度基准”
              - flexDirection: 'row' -> 更像“宽度基准”
          - flexBasis 常与 flexGrow/flexShrink(或简写 flex) 配合: 先给基准, 再按剩余空间伸缩
      */}
      {/* <Box title="Hello Box 1" style={{ backgroundColor: '#0B3D91', flexBasis: 150, flex: 1 }} />
          <Box title="Hello Box 2" style={{ backgroundColor: '#8B0000', height: 150, flex: 1 }} /> */}

      {/* flexGrow vs flexShrink
          - flexGrow: 有剩余空间时如何“分到更多”(数值越大分得越多)
          - flexShrink: 空间不够时如何“被压缩”(数值越大越愿意缩)
      */}
      {/* <Box title="Box 1 shrink" style={{ backgroundColor: '#0B3D91', flexShrink: 1 }} />
          <Box title="Box 2 shrink" style={{ backgroundColor: '#8B0000', flexShrink: 1 }} /> */}

      {/* <Box title="Hello Box 1" style={{ backgroundColor: '#0B3D91' }} />
      <Box title="Hello Box 2" style={{ backgroundColor: '#8B0000' }} />
      <Box title="Hello Box 3" style={{ backgroundColor: '#006400' }} />
      <Box title="Hello Box 4" style={{ backgroundColor: '#B8860B', flexGrow: 0.2 }} />
      <Box title="Hello Box 5" style={{ backgroundColor: '#4B0082' }} />
      <Box title="Hello Box 6" style={{ backgroundColor: '#AD1457', flexGrow: 0.3 }} />
      <Box title="Hello Box 7" style={{ backgroundColor: '#006D77' }} />
      <Box title="Hello Box 8" style={{ backgroundColor: '#5D4037' }} /> */}

      {/* position / top / left
          - position 默认是 'relative': 元素仍参与正常布局, top/left 只是“相对自己原本位置”做偏移
          - position: 'absolute': 元素不再参与正常布局, top/left 相对父容器定位(更像浮层)
      */}
      <Box title="Hello Box 1" style={{ backgroundColor: '#0B3D91' }} />
      <Box title="Hello Box 2" style={{ backgroundColor: '#8B0000' }} />
      <Box title="Hello Box 3" style={{ backgroundColor: '#006400', top: 100, left: 100 }} />
      <Box title="Hello Box 4" style={{ backgroundColor: '#B8860B' }} />
      <Box title="Hello Box 5" style={{ backgroundColor: '#4B0082', top: 100, left: 200 }} />
      <Box title="Hello Box 5" style={{ backgroundColor: '#4B0082', position: 'absolute', top: 100, left: 200 }} />
      <Box title="Hello Box 6" style={{ backgroundColor: '#AD1457' }} />
      <Box title="Hello Box 7" style={{ backgroundColor: '#006D77' }} />
      <Box title="Hello Box 8" style={{ backgroundColor: '#5D4037' }} />
    </View>
  );
}

// 百分比尺寸
// - width/height 支持百分比字符串, 例如 width: '50%' 表示占父容器对应尺寸的 50%
// - 只有父容器的尺寸可计算(例如有明确 width/height 或受布局约束)时, 百分比才会表现稳定

const styles = StyleSheet.create({
  container: {
    // flex: 1 表示占满父容器剩余空间(常用于撑满整屏)
    flex: 1,

    // 固定尺寸(用于演示百分比/布局时很有用)
    // height: 300,
    // width: 300,

    // gap / rowGap / columnGap: 控制子元素之间的间距
    // rowGap: 20,
    // columnGap: 20,
    // gap: 30,

    // flexWrap: 控制子元素是否换行(常与 flexDirection: 'row' 配合)
    // flexWrap: 'nowrap',
    // flexWrap: 'wrap',
    // flexWrap:'wrap-reverse',

    // alignContent: 多行/多列(发生换行后)的整体分布方式, 类似“多行的 justifyContent”
    // 只有在 flexWrap 生效且出现多行/多列时才明显
    // alignContent: 'flex-start',
    // alignContent: 'flex-end',
    // alignContent: 'center',
    // alignContent: 'stretch',
    // alignContent: 'space-between',
    // alignContent: 'space-around',

    // justifyContent: 主轴方向上的排列方式(起点/终点/间隔分布)
    // justifyContent: 'center',
    // justifyContent: 'flex-start',
    // justifyContent: 'flex-end',
    // justifyContent: 'space-between',
    // justifyContent: 'space-around',
    // justifyContent: 'space-evenly',

    // flexDirection: 决定主轴方向
    // flexDirection: 'column',
    // flexDirection: 'column-reverse',
    // flexDirection: 'row-reverse',
    // flexDirection: 'row',

    // alignItems: 交叉轴方向上的对齐方式(写在父容器上, 影响所有子元素)
    // 例如图标高/文字矮导致不齐时, 可以用 alignItems 调整垂直对齐
    // alignItems: 'center',
    // alignItems: 'flex-end',
    // alignItems: 'flex-start',
    // alignItems: 'stretch',
    // alignItems: 'baseline',

    marginTop: 64,
    borderWidth: 6,
    borderColor: '#fa0000ff',
    backgroundColor: '#ffffffff',
  },
});
