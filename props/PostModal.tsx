import React, { useState } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import type { Post } from '../app/(logged-in)/(tabs)/forum';
import { useLikePost } from '../hooks/useLikePost';
import { useAddComment } from '../hooks/useAddComment';

interface PostModalProps {
  visible: boolean;
  post: Post | null;
  onClose: () => void;
  onAddComment: (postId: number, content: string) => Promise<void>;
  loading?: boolean;
}

export default function PostModal({ visible, post, onClose, onAddComment, loading }: PostModalProps) {
  const [commentText, setCommentText] = useState('');
  const { likePost, loading: likeLoading } = useLikePost();
  const { addComment, loading: commentLoading } = useAddComment();

  const handleAddComment = async () => {
    if (!post || !commentText.trim()) return;
    await onAddComment(post.post_id, commentText);
    setCommentText('');
    onClose();
  };

  const handleLike = async () => {
    if (!post) return;
    await likePost(post.post_id);
    // TODO: dodać logikę odświeżenia liczby polubień
  };


  if (!post) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.location}>Lokalizacja: {post.location}</Text>
          <Text style={styles.time}>Dodano: {post.time}</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={handleLike} disabled={likeLoading}>
              {likeLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Polub</Text>}
            </TouchableOpacity>
          </View>
          <Text style={styles.label}>Dodaj komentarz:</Text>
          <TextInput
            placeholder="Twój komentarz..."
            value={commentText}
            onChangeText={setCommentText}
            style={styles.input}
            multiline
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={handleAddComment} disabled={loading || commentLoading}>
              {(loading || commentLoading) ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Dodaj komentarz</Text>}
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose} disabled={loading || commentLoading}>
              <Text style={styles.buttonText}>Zamknij</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    width: '85%',
    elevation: 5
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8
  },
  location: {
    color: '#666',
    marginBottom: 8
  },
  time: {
    color: '#999',
    marginBottom: 16
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 8
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 12,
    padding: 10,
    fontSize: 16
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8
  },
  button: {
    flex: 1,
    backgroundColor: '#1976D2',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginHorizontal: 4
  },
  cancelButton: {
    backgroundColor: '#999'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});