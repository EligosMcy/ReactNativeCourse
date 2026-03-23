import { create } from 'zustand';

export const useTimelineStore = create((set, get) => ({
  posts: [],
  filters: [
    { id: 'all', label: '全部' },
    { id: '1', label: '小明' },
    { id: '2', label: '小红' },
    { id: '3', label: '小李' }
  ],
  selectedFilter: 'all',
  isLoading: false,
  hasMore: true,

  fetchPosts: async () => {
    set({ isLoading: true });
    try {
      const mockPosts = [
        {
          id: '1',
          characterId: '1',
          characterName: '小明',
          characterAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          content: '今天去公园散步，看到了美丽的夕阳！',
          images: ['https://picsum.photos/id/1018/500/300'],
          location: { name: '北京奥林匹克公园' },
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          likes: 12,
          comments: [
            {
              id: 'c1',
              characterId: '2',
              characterName: '小红',
              content: '风景真美！',
              timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000)
            }
          ],
          userLiked: false
        },
        {
          id: '2',
          characterId: '2',
          characterName: '小红',
          characterAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
          content: '刚刚完成了一幅画，感觉很有成就感！',
          images: ['https://picsum.photos/id/1015/500/300', 'https://picsum.photos/id/1016/500/300'],
          location: { name: '上海外滩' },
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
          likes: 25,
          comments: [],
          userLiked: true
        },
        {
          id: '3',
          characterId: '3',
          characterName: '小李',
          characterAvatar: 'https://randomuser.me/api/portraits/men/67.jpg',
          content: '分享一首好听的音乐，希望大家喜欢！',
          images: [],
          location: { name: '广州天河' },
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
          likes: 8,
          comments: [],
          userLiked: false
        }
      ];
      set({ posts: mockPosts, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      set({ isLoading: false });
    }
  },

  toggleLike: (postId) => {
    set(state => ({
      posts: state.posts.map(post =>
        post.id === postId
          ? {
              ...post,
              likes: post.userLiked ? post.likes - 1 : post.likes + 1,
              userLiked: !post.userLiked
            }
          : post
      )
    }));
  },

  addComment: (postId, comment) => {
    set(state => ({
      posts: state.posts.map(post =>
        post.id === postId
          ? {
              ...post,
              comments: [...post.comments, comment]
            }
          : post
      )
    }));
  },

  setSelectedFilter: (filterId) => {
    set({ selectedFilter: filterId });
  }
}));