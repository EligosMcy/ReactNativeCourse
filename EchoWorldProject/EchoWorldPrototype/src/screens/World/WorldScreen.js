import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useWorldStore } from '../../stores/worldStore';

export default function WorldScreen({ navigation }) {
  const { characters, locations, mapRegion, fetchCharacters, fetchLocations, selectCharacter } = useWorldStore();
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchCharacters();
    fetchLocations();
  }, []);

  const handleCharacterPress = (character) => {
    setSelectedCharacter(character);
    setModalVisible(true);
  };

  const handleChat = () => {
    setModalVisible(false);
    navigation.navigate('Chat', { characterId: selectedCharacter.id, character: selectedCharacter });
  };

  const handleProfile = () => {
    setModalVisible(false);
    navigation.navigate('Profile', { characterId: selectedCharacter.id, character: selectedCharacter });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapText}>世界地图</Text>
          {characters.map((character) => (
            <TouchableOpacity
              key={character.id}
              style={[
                styles.characterMarker,
                {
                  left: character.currentLocation.longitude - 116.4 + 150,
                  top: 39.9 - character.currentLocation.latitude + 100
                }
              ]}
              onPress={() => handleCharacterPress(character)}
            >
              <Image
                source={{ uri: character.avatar }}
                style={[
                  styles.characterAvatar,
                  character.status === 'sleeping' && styles.sleepingAvatar
                ]}
              />
              {character.status === 'active' && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.characterCard}>
            <Image source={{ uri: selectedCharacter?.avatar }} style={styles.cardAvatar} />
            <Text style={styles.characterName}>{selectedCharacter?.name}</Text>
            <Text style={styles.characterStatus}>
              {selectedCharacter?.status === 'active' ? '在线' : '离线'}
            </Text>
            <Text style={styles.characterLocation}>
              当前位置：{selectedCharacter?.currentLocation.name}
            </Text>
            <View style={styles.cardActions}>
              <TouchableOpacity style={styles.chatButton} onPress={handleChat}>
                <Text style={styles.chatButtonText}>发消息</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.profileButton} onPress={handleProfile}>
                <Text style={styles.profileButtonText}>查看详情</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mapContainer: {
    flex: 1,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#E8F4FD',
    position: 'relative',
  },
  mapText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    fontSize: 18,
    color: '#666',
  },
  characterMarker: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  characterAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  sleepingAvatar: {
    opacity: 0.5,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#fff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  characterCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: 300,
    alignItems: 'center',
  },
  cardAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
  },
  characterName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  characterStatus: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  characterLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 12,
  },
  chatButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  chatButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  profileButton: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  profileButtonText: {
    color: '#333',
    fontWeight: '600',
  },
});