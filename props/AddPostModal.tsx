import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

interface AddPostModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; location: string }) => void;
  loading?: boolean;
  error?: string | null;
}

export default function AddPostModal({ visible, onClose, onSubmit, loading, error }: AddPostModalProps) {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');

  const handleAdd = () => {
    if (!title.trim() || !location.trim()) return;
    onSubmit({ title, location });
    setTitle('');
    setLocation('');
  };

  const handleClose = () => {
    setTitle('');
    setLocation('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Nowy post</Text>
          <TextInput
            placeholder="Tytuł"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />
          <TextInput
            placeholder="Lokalizacja"
            value={location}
            onChangeText={setLocation}
            style={styles.input}
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={handleAdd} disabled={loading}>
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Dodaj</Text>}
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleClose} disabled={loading}>
              <Text style={styles.buttonText}>Anuluj</Text>
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
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    width: '85%',
    elevation: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 12,
    padding: 10,
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  button: {
    flex: 1,
    backgroundColor: '#1976D2',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  cancelButton: {
    backgroundColor: '#999',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 8,
    textAlign: 'center',
  },
});