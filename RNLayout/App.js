import { StyleSheet, View } from 'react-native';
import Box from './componentes/box';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Box title="Hello Box 1" style={{ backgroundColor: '#0B3D91', alignSelf: 'flex-end' }} />
      <Box title="Hello Box 2" style={{ backgroundColor: '#8B0000', alignSelf: 'flex-start' }} />
      <Box title="Hello Box 3" style={{ backgroundColor: '#006400', alignSelf: 'center' }} />
      <Box title="Hello Box 4" style={{ backgroundColor: '#B8860B', alignSelf: 'stretch' }} />
      <Box title="Hello Box 5" style={{ backgroundColor: '#4B0082', alignSelf: 'auto' }} /> */}

      {/* <Box title="Hello Box 1" style={{ backgroundColor: '#0B3D91', flexBasis: 150, flex: 1 }} />
      <Box title="Hello Box 2" style={{ backgroundColor: '#8B0000', height: 150, flex: 1 }} /> */}

      {/* <Box title="Box 1 shrink" style={{ backgroundColor: '#0B3D91', flexShrink: 1 }} /> */}
      {/* <Box title="Box 2 shrink" style={{ backgroundColor: '#8B0000', flexShrink: 1 }} /> */}

      {/* <Box title="Hello Box 1" style={{ backgroundColor: '#0B3D91' }} />
      <Box title="Hello Box 2" style={{ backgroundColor: '#8B0000' }} />
      <Box title="Hello Box 3" style={{ backgroundColor: '#006400' }} />
      <Box title="Hello Box 4" style={{ backgroundColor: '#B8860B', flexGrow: 0.2 }} />
      <Box title="Hello Box 5" style={{ backgroundColor: '#4B0082' }} />
      <Box title="Hello Box 6" style={{ backgroundColor: '#AD1457', flexGrow: 0.3 }} />
      <Box title="Hello Box 7" style={{ backgroundColor: '#006D77' }} />
      <Box title="Hello Box 8" style={{ backgroundColor: '#5D4037' }} /> */}

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

//position 不参与正常布局


// Relative Layout 是指元素的宽度和高度是根据父元素的宽度和高度来计算的
// 例如: 父元素的宽度是 300, 子元素的宽度是 50%, 那么子元素的宽度就是 150

// alignSelf 是为了单独修改某个元素的对齐方式,并且alignItems 是为了修改所有元素的对齐方式

// flexBasis 是为了控制元素的宽度,弹性宽度
// flexShrink 是为了控制元素的缩放比例,弹性收缩
// flexGrow 是为了控制元素的缩放比例,弹性增长


// flexBasis 和 height 的区别是: height 永远是“高度”; flexBasis 是 flex 主轴方向上的“基准尺寸”
// flexDirection 为 column(默认) 时 flexBasis 更像“高度基准”; flexDirection 为 row 时 flexBasis 更像“宽度基准”
// flexBasis 往往配合 flexGrow/flexShrink(或简写 flex) 一起使用,用于先定基准再按比例伸缩; height 更偏固定尺寸

const styles = StyleSheet.create({
  container: {
    //flex:1 是为了占满整个屏幕
    flex: 1,
    // height: 300,
    // width: 300,

    // gap 是为了控制元素之间的间距
    // rowGap: 20,
    // columnGap: 20,
    // gap: 30,

    //flexWrap 是为了控制元素是否换行 
    // flexWrap: 'nowrap',
    // flexWrap: 'wrap',
    // flexWrap:'wrap-reverse',

    /// alignContent 是为了修改所有元素的对齐方式
    // alignContent: 'flex-start',
    // alignContent: 'flex-end',
    // alignContent: 'center',
    // alignContent: 'stretch',
    // alignContent: 'space-between',
    // alignContent: 'space-around',

    // justifyContent 是为了修改元素的排列位置
    // justifyContent: 'center',
    // justifyContent: 'flex-start',
    // justifyContent: 'flex-end',
    // justifyContent: 'space-between',
    // justifyContent: 'space-around',
    // justifyContent: 'space-evenly',

    // flexDirection 是为了控制对齐轴方向
    // flexDirection: 'column',
    // flexDirection: 'column-reverse',
    // flexDirection: 'row-reverse',
    // flexDirection: 'row',

    //alignItems 是为了修改所有元素的对齐方式
    //Logo 高,文字矮,看起来不整齐,你需要改变垂直方向
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
