import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, DESIGN_PRINCIPLES } from '../constants/DesignSystem';

const { width, height } = Dimensions.get('window');

const CameraScreen = ({ navigation }) => {
  const handleClose = () => {
    navigation.goBack();
  };

  const handleCapture = () => {
    // 处理拍照逻辑
    navigation.navigate('CreateResident');
  };

  const handleSwitchCamera = () => {
    // 切换摄像头
    console.log('Switch camera');
  };

  return (
    <View style={styles.container}>
      {/* 顶部控制栏 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Text style={styles.closeIcon}>×</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>唤醒数字生命</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* 相机预览区域 */}
      <View style={styles.cameraPreview}>
        {/* 取景框 */}
        <View style={styles.viewfinder}>
          <View style={styles.viewfinderFrame}>
            {/* 对焦线 */}
            <View style={styles.focusLines}>
              <View style={[styles.focusLine, styles.focusLineTop]} />
              <View style={[styles.focusLine, styles.focusLineBottom]} />
              <View style={[styles.focusLine, styles.focusLineLeft]} />
              <View style={[styles.focusLine, styles.focusLineRight]} />
            </View>
            
            {/* 中心点 */}
            <View style={styles.centerDot} />
          </View>
        </View>

        {/* 引导文字 */}
        <View style={styles.guideTextContainer}>
          <Text style={styles.guideText}>将物件置于取景框内</Text>
          <Text style={styles.guideSubtext}>确保光线充足，背景简洁</Text>
        </View>
      </View>

      {/* 底部控制栏 */}
      <View style={styles.controls}>
        {/* 相册预览 */}
        <TouchableOpacity style={styles.galleryButton}>
          <View style={styles.galleryPreview}>
            <Text style={styles.galleryIcon}>📷</Text>
          </View>
        </TouchableOpacity>

        {/* 快门按钮 */}
        <TouchableOpacity style={styles.shutterButton} onPress={handleCapture}>
          <View style={styles.shutterOuter}>
            <View style={styles.shutterInner} />
          </View>
        </TouchableOpacity>

        {/* 切换摄像头 */}
        <TouchableOpacity style={styles.switchButton} onPress={handleSwitchCamera}>
          <Text style={styles.switchIcon}>🔄</Text>
        </TouchableOpacity>
      </View>

      {/* 状态指示器 */}
      <View style={styles.statusBar}>
        <Text style={styles.statusText}>准备就绪</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xxl,
    paddingBottom: SPACING.lg,
    backgroundColor: 'rgba(0,0,0,0.5)',
    ...DESIGN_PRINCIPLES.glassmorphism,
  },
  closeButton: {
    padding: SPACING.xs,
  },
  closeIcon: {
    ...TYPOGRAPHY.titleMd,
    color: '#fff',
  },
  headerTitle: {
    ...TYPOGRAPHY.titleMd,
    color: '#fff',
    letterSpacing: 1,
  },
  headerSpacer: {
    width: 40,
  },
  cameraPreview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewfinder: {
    width: width * 0.8,
    height: width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewfinderFrame: {
    width: '100%',
    height: '100%',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.8)',
    borderRadius: BORDER_RADIUS.lg,
    position: 'relative',
  },
  focusLines: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  focusLine: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  focusLineTop: {
    top: '25%',
    left: '10%',
    right: '10%',
    height: 1,
  },
  focusLineBottom: {
    bottom: '25%',
    left: '10%',
    right: '10%',
    height: 1,
  },
  focusLineLeft: {
    left: '25%',
    top: '10%',
    bottom: '10%',
    width: 1,
  },
  focusLineRight: {
    right: '25%',
    top: '10%',
    bottom: '10%',
    width: 1,
  },
  centerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.6)',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -4,
    marginTop: -4,
  },
  guideTextContainer: {
    position: 'absolute',
    bottom: SPACING.xl,
    alignItems: 'center',
  },
  guideText: {
    ...TYPOGRAPHY.bodyMd,
    color: '#fff',
    marginBottom: SPACING.xs,
  },
  guideSubtext: {
    ...TYPOGRAPHY.labelMd,
    color: 'rgba(255,255,255,0.7)',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.xxl,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  galleryButton: {
    padding: SPACING.sm,
  },
  galleryPreview: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  galleryIcon: {
    ...TYPOGRAPHY.bodyLg,
  },
  shutterButton: {
    padding: SPACING.sm,
  },
  shutterOuter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  switchButton: {
    padding: SPACING.sm,
  },
  switchIcon: {
    ...TYPOGRAPHY.bodyLg,
    color: '#fff',
  },
  statusBar: {
    position: 'absolute',
    bottom: SPACING.xl,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  statusText: {
    ...TYPOGRAPHY.labelMd,
    color: 'rgba(255,255,255,0.7)',
  },
});

export default CameraScreen;