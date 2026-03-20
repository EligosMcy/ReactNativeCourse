import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ImageBackground, TextInput } from 'react-native';

const { width, height } = Dimensions.get('window');

const CreateResidentScreen = ({ navigation }) => {
  const [residentName, setResidentName] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    if (residentName.trim()) {
      navigation.navigate('ResidentDetail');
    }
  };

  const handleRetake = () => {
    navigation.navigate('Camera');
  };

  return (
    <View style={styles.container}>
      {/* Top Navigation */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>创建居民</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Photo Preview */}
        <View style={styles.photoSection}>
          <ImageBackground 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3mgMlPVaF5OmXib751QZW5rf5MwLmBnFY9A4pmcJm_JjgfoAHLsetNelFpdmGknDBN90d8T_1E0QA0VmrvMdGyVmgrrwkiHAQJ_u82LmMmZP9qgW5-UWQp_xGx0GbSeWK8EaN8j6nipECWcDyGpecE_gD-FD7j_-MnvyYqUFXtYYOdp5lDJjxcfMEqOouqFNn5Uy_lGo4ODwCV7nk6S1VzKE3VCyavC08shZ3JDEZ500jG11wWEcKvd5ZAhrWa-uBZTndlLzT9_g' }}
            style={styles.photoPreview}
            imageStyle={styles.photoImage}
          >
            <View style={styles.photoOverlay} />
          </ImageBackground>
          
          <TouchableOpacity style={styles.retakeButton} onPress={handleRetake}>
            <Text style={styles.retakeText}>重新拍摄</Text>
          </TouchableOpacity>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>居民名称</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="为您的居民命名..."
                placeholderTextColor="#adb3b0"
                value={residentName}
                onChangeText={setResidentName}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>描述</Text>
            <View style={styles.textareaWrapper}>
              <TextInput
                style={styles.textarea}
                placeholder="描述这个居民的特点..."
                placeholderTextColor="#adb3b0"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
              />
            </View>
          </View>

          <View style={styles.tagsSection}>
            <Text style={styles.tagsLabel}>标签</Text>
            <View style={styles.tagsContainer}>
              <TouchableOpacity style={styles.tag}>
                <Text style={styles.tagText}>探索者</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tag}>
                <Text style={styles.tagText}>守护者</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tag}>
                <Text style={styles.tagText}>思考者</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addTagButton}>
                <Text style={styles.addTagIcon}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsSection}>
          <TouchableOpacity 
            style={[styles.saveButton, !residentName.trim() && styles.saveButtonDisabled]}
            onPress={handleSave}
            disabled={!residentName.trim()}
          >
            <Text style={styles.saveButtonText}>保存居民</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>取消</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    fontSize: 20,
    color: '#5f5e5e',
  },
  headerTitle: {
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3432',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  photoSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  photoPreview: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    marginBottom: 16,
  },
  photoImage: {
    width: '100%',
    height: '100%',
  },
  photoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle, transparent 40%, rgba(45, 52, 50, 0.05) 100%)',
  },
  retakeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  retakeText: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#51616e',
    textDecorationLine: 'underline',
  },
  formSection: {
    gap: 24,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontFamily: 'Inter',
    fontSize: 12,
    letterSpacing: 2,
    color: '#767c79',
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  inputWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(173, 179, 176, 0.3)',
    paddingBottom: 12,
  },
  input: {
    fontFamily: 'Inter',
    fontSize: 18,
    color: '#2d3432',
    padding: 0,
  },
  textareaWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(173, 179, 176, 0.3)',
    paddingBottom: 12,
    minHeight: 80,
  },
  textarea: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#2d3432',
    padding: 0,
    textAlignVertical: 'top',
  },
  tagsSection: {
    gap: 12,
  },
  tagsLabel: {
    fontFamily: 'Inter',
    fontSize: 12,
    letterSpacing: 2,
    color: '#767c79',
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#f2f4f2',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
  },
  tagText: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#51616e',
  },
  addTagButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f2f4f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addTagIcon: {
    fontSize: 18,
    color: '#767c79',
  },
  actionsSection: {
    marginTop: 40,
    gap: 16,
  },
  saveButton: {
    backgroundColor: '#5f5e5e',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonText: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#faf7f6',
    fontWeight: '600',
  },
  cancelButton: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#767c79',
  },
});

export default CreateResidentScreen;