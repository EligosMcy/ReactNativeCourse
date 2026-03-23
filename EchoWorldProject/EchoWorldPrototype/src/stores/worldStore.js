import { create } from 'zustand';

const initialRegion = {
  latitude: 39.9042,
  longitude: 116.4074,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
};

export const useWorldStore = create((set, get) => ({
  characters: [],
  locations: [],
  mapRegion: initialRegion,
  selectedCharacter: null,
  loading: false,

  fetchCharacters: async () => {
    set({ loading: true });
    try {
      const mockCharacters = [
        {
          id: '1',
          name: '小明',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          status: 'active',
          currentLocation: {
            latitude: 39.9042,
            longitude: 116.4074,
            name: '北京'
          },
          mood: 'happy',
          energy: 85,
          lastActivity: new Date()
        },
        {
          id: '2',
          name: '小红',
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
          status: 'sleeping',
          currentLocation: {
            latitude: 31.2304,
            longitude: 121.4737,
            name: '上海'
          },
          mood: 'tired',
          energy: 30,
          lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000)
        },
        {
          id: '3',
          name: '小李',
          avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
          status: 'active',
          currentLocation: {
            latitude: 23.1291,
            longitude: 113.2644,
            name: '广州'
          },
          mood: 'excited',
          energy: 95,
          lastActivity: new Date()
        }
      ];
      set({ characters: mockCharacters, loading: false });
    } catch (error) {
      console.error('Failed to fetch characters:', error);
      set({ loading: false });
    }
  },

  fetchLocations: async () => {
    const mockLocations = [
      {
        id: '1',
        name: '北京',
        latitude: 39.9042,
        longitude: 116.4074
      },
      {
        id: '2',
        name: '上海',
        latitude: 31.2304,
        longitude: 121.4737
      },
      {
        id: '3',
        name: '广州',
        latitude: 23.1291,
        longitude: 113.2644
      }
    ];
    set({ locations: mockLocations });
  },

  selectCharacter: (character) => {
    set({ selectedCharacter: character });
  },

  handleRegionChange: (region) => {
    set({ mapRegion: region });
  }
}));