import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
} from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function EditProductScreen() {
  const route = useRoute();
  const { id } = route.params;
  const navigation = useNavigation();

  const [produto, setProduto] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${id}`)
      .then(response => setProduto(response.data))
      .catch(() => Alert.alert('Erro', 'Erro ao carregar produto'));
  }, [id]);

  const handleSave = () => {
    setModalVisible(true); 
  };

  const confirmEdit = () => {
    axios.put(`https://dummyjson.com/products/${id}`, produto)
      .then(() => {
        Alert.alert('Sucesso', 'Produto editado com sucesso');
        navigation.goBack();
      })
      .catch(() => Alert.alert('Erro', 'Erro ao editar produto'))
      .finally(() => setModalVisible(false));
  };

  if (!produto) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={produto.title}
        onChangeText={text => setProduto({ ...produto, title: text })}
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={styles.input}
        value={produto.description}
        onChangeText={text => setProduto({ ...produto, description: text })}
      />

      <Text style={styles.label}>Preço (R$)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={produto.price.toString()}
        onChangeText={text => setProduto({ ...produto, price: parseFloat(text) })}
      />

      <Text style={styles.label}>Desconto (%)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={produto.discountPercentage.toString()}
        onChangeText={text => setProduto({ ...produto, discountPercentage: parseFloat(text) })}
      />

      <Text style={styles.label}>URL da imagem</Text>
      <TextInput
        style={styles.input}
        value={produto.thumbnail}
        onChangeText={text => setProduto({ ...produto, thumbnail: text })}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Editar produto</Text>
            <Text style={styles.modalText}>
              Você tem certeza que deseja editar esse produto? Essa ação não poderá ser desfeita.
            </Text>
            <View style={styles.modalActions}>
              <Pressable style={[styles.modalButton, styles.cancel]} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelText}>Cancelar</Text>
              </Pressable>
              <Pressable style={[styles.modalButton, styles.confirm]} onPress={confirmEdit}>
                <Text style={styles.confirmText}>Editar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontWeight: 'bold', marginTop: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginTop: 4,
  },
  button: {
    backgroundColor: '#2563EB',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    width: '85%',
    borderRadius: 10,
  },
  modalTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 10 },
  modalText: { fontSize: 14, marginBottom: 20 },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  cancel: { backgroundColor: '#E5E7EB' },
  confirm: { backgroundColor: '#2563EB' },
  cancelText: { color: '#000' },
  confirmText: { color: '#fff', fontWeight: 'bold' },
});
