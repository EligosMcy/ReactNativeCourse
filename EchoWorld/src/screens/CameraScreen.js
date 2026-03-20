import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ImageBackground } from 'react-native';

const { width, height } = Dimensions.get('window');

const CameraScreen = ({ navigation }) => {
  const handleClose = () => {
    navigation.goBack();
  };

  const handleCapture = () => {
    // 处理拍照逻辑
    console.log('Capture photo');
  };

  const handleSwitchCamera = () => {
    // 切换摄像头
    console.log('Switch camera');
  };

  return (
    <View style={styles.container}>
      {/* Top AppBar (Internal Camera View - Minimalist) */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Text style={styles.closeIcon}>×</Text>
        </TouchableOpacity>
        
        <View style={styles.proModeBadge}>
          <Text style={styles.proModeText}>Pro Mode</Text>
        </View>
        
        <TouchableOpacity style={styles.settingsButton}>
          <Text style={styles.settingsIcon}>⚙</Text>
        </TouchableOpacity>
      </View>

      {/* Main Viewfinder Section */}
      <View style={styles.mainContent}>
        {/* Camera Stream Placeholder */}
        <ImageBackground 
          source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3mgMlPVaF5OmXib751QZW5rf5MwLmBnFY9A4pmcJm_JjgfoAHLsetNelFpdmGknDBN90d8T_1E0QA0VmrvMdGyVmgrrwkiHAQJ_u82LmMmZP9qgW5-UWQp_xGx0GbSeWK8EaN8j6nipECWcDyGpecE_gD-FD7j_-MnvyYqUFXtYYOdp5lDJjxcfMEqOouqFNn5Uy_lGo4ODwCV7nk6S1VzKE3VCyavC08shZ3JDEZ500jG11wWEcKvd5ZAhrWa-uBZTndlLzT9_g' }}
          style={styles.cameraBackground}
          imageStyle={styles.cameraImage}
        >
          {/* Ethereal Overlay */}
          <View style={styles.viewfinderMask} />
        </ImageBackground>

        {/* Instructional Overlay */}
        <View style={styles.instructionOverlay}>
          <Text style={styles.instructionTitle}>
            寻找一个实物作为居民的原型。
          </Text>
          <Text style={styles.instructionSubtitle}>
            (请勿包含人物)
          </Text>
        </View>

        {/* Focus Frame (Digital Curator Aesthetic) */}
        <View style={styles.focusFrame}>
          {/* Corners */}
          <View style={[styles.corner, styles.cornerTopLeft]} />
          <View style={[styles.corner, styles.cornerTopRight]} />
          <View style={[styles.corner, styles.cornerBottomLeft]} />
          <View style={[styles.corner, styles.cornerBottomRight]} />
          
          {/* Scanning Lines */}
          <View style={styles.scanLineHorizontal} />
          <View style={styles.scanLineVertical} />
        </View>
      </View>

      {/* Camera Controls (Floating Container) */}
      <View style={styles.controlsContainer}>
        {/* Zoom / Filter Controls */}
        <View style={styles.zoomControls}>
          <TouchableOpacity style={styles.zoomButton}>
            <Text style={styles.zoomButtonText}>0.5x</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.zoomButton, styles.zoomButtonActive]}>
            <Text style={[styles.zoomButtonText, styles.zoomButtonTextActive]}>1x</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.zoomButton}>
            <Text style={styles.zoomButtonText}>2x</Text>
          </TouchableOpacity>
        </View>

        {/* Main Capture Row */}
        <View style={styles.captureRow}>
          {/* Gallery Thumb */}
          <TouchableOpacity style={styles.galleryButton}>
            <ImageBackground 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbOSZQGsITjNO3XakuH7MmEXmGq36JzwlOvLObjRW3zNoIMW5mYkSNgmYPajOcjeyHvly0I2LR0_jsdML4GXMCSIU-pbT3plJqNvCyVaVg3mfaFh8qRFk5sS5h6DwA293sW8dTzZR5zmhLmCQyzRzcyuOKfa88wCeV0RnVnu7H-QyoaJzU_WS1P4fU7FIt4nRo8p6f4skT0y_8jNEOjL2B4eBtsN_dWgq-2Om-7s4VSL-uEdyd_xqwZobZTfqsO1_JVPqhubBu7RE' }}
              style={styles.galleryThumb}
              imageStyle={styles.galleryImage}
            />
          </TouchableOpacity>

          {/* Shutter Button */}
          <TouchableOpacity style={styles.shutterButton} onPress={handleCapture}>
            <View style={styles.shutterOuter}>
              <View style={styles.shutterInner} />
            </View>
          </TouchableOpacity>

          {/* Switch Camera */}
          <TouchableOpacity style={styles.switchButton} onPress={handleSwitchCamera}>
            <Text style={styles.switchIcon}>🔄</Text>
          </TouchableOpacity>
        </View>

        {/* Status Indicator */}
        <View style={styles.statusIndicator}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>Ready to Archive</Text>
        </View>
      </View>

      {/* Texture Overlay */}
      <View style={styles.textureOverlay} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2d3432',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    height: 64,
    zIndex: 50,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(249, 249, 247, 0.2)',
    backdropFilter: 'blur(10px)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    fontSize: 20,
    color: '#f9f9f7',
  },
  proModeBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 9999,
    backgroundColor: 'rgba(242, 244, 242, 0.4)',
    backdropFilter: 'blur(20px)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  proModeText: {
    fontFamily: 'Inter',
    fontSize: 10,
    letterSpacing: 2,
    color: 'rgba(249, 249, 247, 0.8)',
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(249, 249, 247, 0.2)',
    backdropFilter: 'blur(10px)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsIcon: {
    fontSize: 20,
    color: '#f9f9f7',
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  cameraImage: {
    width: '100%',
    height: '100%',
  },
  viewfinderMask: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle, transparent 60%, rgba(45, 52, 50, 0.4) 100%)',
  },
  instructionOverlay: {
    position: 'absolute',
    top: '10%',
    zIndex: 10,
    textAlign: 'center',
    paddingHorizontal: 48,
  },
  instructionTitle: {
    fontFamily: 'Noto Serif',
    fontSize: 22,
    color: '#f9f9f7',
    textAlign: 'center',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  instructionSubtitle: {
    fontFamily: 'Inter',
    fontSize: 14,
    letterSpacing: 2,
    color: 'rgba(249, 249, 247, 0.7)',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  focusFrame: {
    width: 288,
    height: 288,
    borderWidth: 0.5,
    borderColor: 'rgba(249, 249, 247, 0.2)',
    borderRadius: 12,
    pointerEvents: 'none',
    zIndex: 5,
  },
  corner: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderWidth: 1,
    borderColor: 'rgba(249, 249, 247, 0.6)',
  },
  cornerTopLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: 12,
  },
  cornerTopRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopRightRadius: 12,
  },
  cornerBottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomLeftRadius: 12,
  },
  cornerBottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomRightRadius: 12,
  },
  scanLineHorizontal: {
    position: 'absolute',
    top: '50%',
    left: 0,
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(249, 249, 247, 0.1)',
  },
  scanLineVertical: {
    position: 'absolute',
    left: '50%',
    top: 0,
    height: '100%',
    width: 1,
    backgroundColor: 'rgba(249, 249, 247, 0.1)',
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 48,
    paddingTop: 32,
    paddingHorizontal: 32,
    zIndex: 50,
    alignItems: 'center',
    gap: 40,
  },
  zoomControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 32,
    backgroundColor: 'rgba(242, 244, 242, 0.2)',
    backdropFilter: 'blur(20px)',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  zoomButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  zoomButtonActive: {
    backgroundColor: 'rgba(249, 249, 247, 0.05)',
    borderRadius: 9999,
  },
  zoomButtonText: {
    fontFamily: 'Inter',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 2,
    color: 'rgba(249, 249, 247, 0.4)',
  },
  zoomButtonTextActive: {
    color: '#f9f9f7',
  },
  captureRow: {
    width: '100%',
    maxWidth: 400,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  galleryButton: {
    width: 48,
    height: 48,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  galleryThumb: {
    width: '100%',
    height: '100%',
  },
  galleryImage: {
    width: '100%',
    height: '100%',
  },
  shutterButton: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterOuter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#f9f9f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#f9f9f7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  switchButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchIcon: {
    fontSize: 24,
    color: '#f9f9f7',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#5f5e5e',
    animation: 'pulse 2s infinite',
  },
  statusText: {
    fontFamily: 'Inter',
    fontSize: 10,
    letterSpacing: 3,
    color: 'rgba(249, 249, 247, 0.6)',
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  textureOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.03,
    pointerEvents: 'none',
    zIndex: 60,
  },
});

export default CameraScreen;