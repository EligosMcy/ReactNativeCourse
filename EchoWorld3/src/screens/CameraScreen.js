import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../constants/DesignSystem';

const CameraScreen = ({ navigation }) => {
  const [isCapturing, setIsCapturing] = useState(false);

  const handleCapture = () => {
    setIsCapturing(true);
    setTimeout(() => {
      navigation.navigate('CreateResident');
    }, 1000);
  };

  const handleSwitchCamera = () => {
    // 切换摄像头逻辑
    console.log('Switch camera');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>拍摄居民原型</Text>
        <Text style={styles.subtitle}>请拍摄一个清晰的图像作为数字居民的基础</Text>
      </View>

      <View style={styles.cameraPreview}>
        <View style={styles.focusFrame}>
          <Text style={styles.focusText}>请将对象置于框内</Text>
        </View>
        
        {/* 模拟相机预览 */}
        <View style={styles.previewPlaceholder}>
          <Text style={styles.previewText}>相机预览</Text>
        </View>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.switchButton} onPress={handleSwitchCamera}>
          <Text style={styles.switchButtonText}>切换</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.captureButton, isCapturing && styles.captureButtonActive]} 
          onPress={handleCapture}
          disabled={isCapturing}
        >
          <View style={styles.captureButtonInner} />
        </TouchableOpacity>
        
        <View style={styles.placeholder} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SPACING.xl,
    paddingTop: SPACING.xxl,
    backgroundColor: COLORS.surfaceContainerLow,
  },
  title: {
    ...TYPOGRAPHY.headlineMd,
    color: COLORS.primaryText,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.secondaryText,
  },
  cameraPreview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    position: 'relative',
  },
  focusFrame: {
    position: 'absolute',
    top: '30%',
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: COLORS.activePulse,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  focusText: {
    ...TYPOGRAPHY.labelMd,
    color: COLORS.activePulse,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
  },
  previewPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  previewText: {
    ...TYPOGRAPHY.bodyLg,
    color: '#fff',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.xl,
    backgroundColor: COLORS.surfaceContainerLow,
  },
  switchButton: {
    padding: SPACING.md,
    backgroundColor: COLORS.surfaceContainerHighest,
    borderRadius: BORDER_RADIUS.md,
  },
  switchButtonText: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.primaryText,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonActive: {
    borderColor: COLORS.activePulse,
  },
  captureButtonInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
  },
  placeholder: {
    width: 50,
  },
});

export default CameraScreen;