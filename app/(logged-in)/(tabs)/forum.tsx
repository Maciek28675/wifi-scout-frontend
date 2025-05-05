import React, { useState, useEffect, useContext } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  FlatList,
  TextInput,
  TouchableOpacity,
  StatusBar 
} from 'react-native';
import { 
  Ionicons, 
  FontAwesome 
} from '@expo/vector-icons';
import { useUserInitials } from '../../../hooks/useUserInitials';
import { useAddPost } from '../../../hooks/useAddPost';
import AddPostModal from '../../../props/AddPostModal';
import PostModal from '../../../props/PostModal';
import { useAddComment } from '../../../hooks/useAddComment';

export interface Post {
  post_id: number;
  user_id: number;
  title: string;
  likes: number;
  comments: number;
  location: string;
  time: string;
}

interface RenderItemProps {
  item: Post;
}

export default function ForumScreen() {
  // const { userId } = useContext(AuthContext); // Uncomment this if you have userId from context
  const [activeTab, setActiveTab] = useState<'newest'|'popular'|'my'>('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  // Add post hooks
  const { addPost, loading, error } = useAddPost();
  const [modalVisible, setModalVisible] = useState(false);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const handleOpenPost = (post: Post) => setSelectedPost(post);
  const handleClosePost = () => setSelectedPost(null);

  // Comment hooks
    const { addComment, loading: commentLoading } = useAddComment();
  const handleAddCommentToPost = async (postId: number, content: string) => {
    await addComment(postId, content);
    // TODO: dodać logikę odświeżenia komentarzy
  };

  const handleAddPost = async ({ title, location }: { title: string; location: string }) => {
    const now = new Date();
    const time = `${now.getTime()}`;
    const newPost = await addPost({
      user_id: 1, 
      // user_id: userId, // Uncomment this if you have userId from context
      title,
      location,
      time,
    });
    if (newPost) {
      setFilteredPosts(prev => [newPost as Post, ...prev]);
      setModalVisible(false);
    }
  };

  const posts: Post[] = [
    {
      post_id: 1,
      user_id: 2,
      title: 'Gdzie znajdę najlepszy zasięg na kampusie?',
      likes: 5,
      comments: 2,
      time: '1 h temu',
      location: 'C-16'
    },
    {
      post_id: 2,
      user_id: 3,
      title: 'Gdzie znajdę najlepszy zasięg na kampusie?',
      likes: 7,
      comments: 7,
      time: '1 h temu',
      location: 'C-14'
    },
    {
      post_id: 3,
      user_id: 4,
      title: 'Gdzie znajdę najlepszy zasięg na kampusie?',
      likes: 5,
      comments: 2,
      time: '1 h temu',
      location: 'C-3'
    },
    {
      post_id: 4,
      user_id: 5,
      title: 'Gdzie znajdę najlepszy zasięg na kampusie?',
      likes: 7,
      comments: 7,
      time: '1 h temu',
      location: 'C-2'
    }
  ];

  useEffect(() => {
    let result = [...posts];
    
    if (searchQuery) {
      result = result.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (activeTab === 'popular') {
      result.sort((a, b) => b.likes - a.likes);
    } else if (activeTab === 'my') {
      result = result.filter(post => post.user_id === 1);
    }

    // Uncomment this if you have userId from context
    // if (activeTab === 'popular') {
    //   result.sort((a, b) => b.likes - a.likes);
    // } else if (activeTab === 'my' && userId != null) {
    //   result = result.filter(post => post.user_id === userId);
    // }
    
    setFilteredPosts(result);
  }, [searchQuery, activeTab]);

  const renderPostItem = ({ item }: RenderItemProps) => {
    const userInitials = useUserInitials(item.user_id);
    
    return (
      <TouchableOpacity onPress={() => handleOpenPost(item)}>
      <View style={styles.postCard}>
      <View style={styles.postCard}>
        <View style={styles.postHeader}>
          <View style={[styles.avatarContainer, { backgroundColor: '#1976D2' }]}>
            <Text style={styles.avatarText}>{userInitials}</Text>
          </View>
          <View style={styles.postTitleContainer}>
            <Text style={styles.postTitle}>{item.title}</Text>
          </View>
        </View>
        
        <View style={styles.postInfo}>
          <Ionicons name="location" size={14} color="#666" />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>

        <View style={styles.postFooter}>
          <View style={styles.engagementContainer}>
            <FontAwesome name="heart" size={16} color="#E53935" />
            <Text style={styles.engagementText}>{item.likes}</Text>
          </View>
          <View style={styles.engagementContainer}>
            <FontAwesome name="comment" size={16} color="#1976D2" />
            <Text style={styles.engagementText}>{item.comments}</Text>
          </View>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
      </View>
      </View>
    </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Forum</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={15} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Wyszukaj wpisu"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
          clearButtonMode="while-editing"
          returnKeyType="search"
          underlineColorAndroid='transparent'
          autoCapitalize="none"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={18} color="#999" style={styles.clearIcon} />
          </TouchableOpacity>
        )}
      </View>
      
      {/* Nawigacja */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'newest' && styles.activeTab]}
          onPress={() => setActiveTab('newest')}
        >
          <Text style={[styles.tabText, activeTab === 'newest' && styles.activeTabText]}>Najnowsze</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'popular' && styles.activeTab]}
          onPress={() => setActiveTab('popular')}
        >
          <Text style={[styles.tabText, activeTab === 'popular' && styles.activeTabText]}>Popularne</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'my' && styles.activeTab]}
          onPress={() => setActiveTab('my')}
        >
          <Text style={[styles.tabText, activeTab === 'my' && styles.activeTabText]}>Moje wpisy</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={filteredPosts}
        renderItem={renderPostItem}
        keyExtractor={item => item.post_id.toString()}
        contentContainerStyle={styles.flatListContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyList}>
            <Text style={styles.emptyListText}>
              {searchQuery ? 'Nie znaleziono wyników wyszukiwania' : 'Brak dostępnych postów'}
            </Text>
          </View>
        }
      />

      <PostModal
        visible={!!selectedPost}
        post={selectedPost}
        onClose={handleClosePost}
        onAddComment={handleAddCommentToPost}
        loading={commentLoading}
      />

      <AddPostModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleAddPost}
        loading={loading}
        error={error}
      />
      
      {/* Dodawanie posta przycisk */}
      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    marginHorizontal: 20,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderColor: 'transparent',
    borderWidth: 0,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    color: '#333',
    borderColor: 'transparent',
    borderWidth: 0,
  },
  clearIcon: {
    marginLeft: 10,
  },
  emptyList: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  emptyListText: {
    fontSize: 16,
    color: '#999',
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  tab: {
    marginRight: 20,
    paddingBottom: 5,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#1976D2',
  },
  tabText: {
    fontSize: 14,
    color: '#999',
  },
  activeTabText: {
    color: '#1976D2',
    fontWeight: '500',
  },
  flatListContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  postCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    color: 'white',
    fontWeight: 'bold',
  },
  postTitleContainer: {
    flex: 1,
  },
  postTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  postInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
  },
  postFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  engagementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  engagementText: {
    marginLeft: 5,
    color: '#666',
  },
  timeText: {
    marginLeft: 'auto',
    fontSize: 12,
    color: '#999',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#1976D2',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  }
});