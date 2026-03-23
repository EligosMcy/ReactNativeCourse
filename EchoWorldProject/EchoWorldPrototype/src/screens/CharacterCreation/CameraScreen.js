import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Colors, Typography, BorderRadius } from '../../theme/DesignSystem';

export default function CameraScreen({ navigation, route }) {
  const { type, step } = route.params; // 'prototype' 或 'room'，以及当前步骤
  const [imageUri, setImageUri] = useState(null);

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('需要权限', '需要相机权限才能拍照');
      return;
    }
    
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.8,
    });
    
    if (!result.canceled && result.assets[0]) {
      setImageUri(result.assets[0].uri);
    }
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('需要权限', '需要相册权限才能选择图片');
      return;
    }
    
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.8,
    });
    
    if (!result.canceled && result.assets[0]) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleConfirm = () => {
    if (!imageUri) {
      Alert.alert('请先选择图片', '请拍照或从相册选择一张图片');
      return;
    }
    
    // 返回角色创建屏幕并传递图片和步骤参数
    navigation.navigate('CharacterCreation', { 
      imageUri, 
      type,
      step
    });
  };

  const getTitle = () => {
    return type === 'prototype' ? '拍摄原型照片' : '拍摄房间角落';
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{getTitle()}</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.cameraContainer}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.previewImage} />
        ) : (
          <View style={styles.cameraPlaceholder}>
            <Ionicons name="camera-outline" size={80} color="#999" />
            <Text style={styles.placeholderText}>点击下方按钮拍照或选择图片</Text>
          </View>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.sideButton} onPress={pickImage}>
          <Ionicons name="images-outline" size={28} color="#333" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.captureButton} onPress={takePhoto}>
          <View style={styles.captureButtonInner} />
        </TouchableOpacity>
        
        {imageUri && (
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
            <Ionicons name="checkmark" size={24} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: Colors.surfaceContainerLow,
  },
  backButton: {
    padding: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.digitalInk,
    fontFamily: Typography.sansSerif,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cameraPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: Colors.surfaceContainerLow,
  },
  placeholderText: {
    fontSize: 18,
    color: Colors.onSurface,
    marginTop: 24,
    fontFamily: Typography.sansSerif,
    opacity: 0.7,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: Colors.surfaceContainerLow,
  },
  sideButton: {
    width: 64,
    height: 64,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surfaceContainerHighest,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 68,
    height: 68,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.onPrimary,
  },
  confirmButton: {
    width: 64,
    height: 64,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.vitalityMint,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
