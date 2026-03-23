import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function CameraScreen({ navigation, route }) {
  const { type, onPhotoTaken } = route.params;
  const [hasPermission, setHasPermission] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [flashMode, setFlashMode] = useState('off');

  React.useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleTakePhoto = async () => {
    if (!hasPermission) {
      Alert.alert('权限提示', '需要相机权限才能拍照');
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        flash: flashMode === 'on' ? ImagePicker.CameraFlashMode.on : ImagePicker.CameraFlashMode.off,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('拍照失败', '无法访问相机，请检查权限设置');
    }
  };

  const handlePickFromGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('选择失败', '无法访问相册，请检查权限设置');
    }
  };

  const handleConfirm = () => {
    if (imageUri) {
      onPhotoTaken(imageUri);
      navigation.goBack();
    } else {
      Alert.alert('提示', '请先拍摄或选择照片');
    }
  };

  const handleRetake = () => {
    setImageUri(null);
  };

  const toggleFlash = () => {
    setFlashMode(prev => 
      prev === 'off' ? 'on' : 
      prev === 'on' ? 'auto' : 'off'
    );
  };

  if (hasPermission === null) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text>正在请求相机权限...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (hasPermission === false) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionDeniedContainer}>
          <Ionicons name="camera-off" size={64} color="#999" />
          <Text style={styles.permissionDeniedText}>相机权限被拒绝</Text>
          <Text style={styles.permissionDeniedSubtext}>请在设置中开启相机权限</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>返回</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {type === 'prototype' ? '拍摄原型照片' : '拍摄房间角落'}
        </Text>
        <TouchableOpacity
          style={styles.flashButton}
          onPress={toggleFlash}
        >
          <Ionicons
            name={flashMode === 'on' ? 'flash' : flashMode === 'auto' ? 'flash-auto' : 'flash-off'}
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      {imageUri ? (
        <View style={styles.previewContainer}>
          <Image source={{ uri: imageUri }} style={styles.previewImage} />
          <View style={styles.previewButtons}>
            <TouchableOpacity
              style={[styles.previewButton, styles.retakeButton]}
              onPress={handleRetake}
            >
              <Text style={styles.retakeButtonText}>重拍</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.previewButton, styles.confirmButton]}
              onPress={handleConfirm}
            >
              <Text style={styles.confirmButtonText}>确认</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.cameraContainer}>
          <View style={styles.cameraPlaceholder}>
            <Text style={styles.cameraPlaceholderText}>相机预览区域</Text>
          </View>
          <View style={styles.cameraButtons}>
            <TouchableOpacity
              style={styles.galleryButton}
              onPress={handlePickFromGallery}
            >
              <Ionicons name="images" size={32} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.captureButton}
              onPress={handleTakePhoto}
            >
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>
            <View style={styles.placeholderButton} />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionDeniedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  permissionDeniedText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 16,
    marginBottom: 8,
  },
  permissionDeniedSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  backButton: {
    padding: 8,
  },
  flashButton: {
    padding: 8,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cameraPlaceholder: {
    flex: 1,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraPlaceholderText: {
    fontSize: 16,
    color: '#999',
  },
  cameraButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 40,
    gap: 40,
  },
  galleryButton: {
    padding: 16,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  captureButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  placeholderButton: {
    width: 56,
    height: 56,
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  previewImage: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
  },
  previewButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 20,
    gap: 40,
  },
  previewButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  retakeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: '#fff',
  },
  retakeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  confirmButton: {
    backgroundColor: '#007AFF',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});