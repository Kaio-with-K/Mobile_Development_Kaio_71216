import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

export default function ProductDetailScreen({ route }) {
  const { id } = route.params;
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${id}`)
      .then(response => setProduto(response.data))
      .catch(() => alert('Erro ao carregar produto'))
      .finally(() => setLoading(false));
  }, []);

  const precoDesconto = produto
    ? (produto.price * (1 - produto.discountPercentage / 100)).toFixed(2)
    : '0.00';

  const handleDelete = async () => {
    try {
      await axios.delete(`https://dummyjson.com/products/${id}`);
      Alert.alert('Sucesso', 'Produto excluído com sucesso!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível excluir o produto.');
    } finally {
      setShowDeleteModal(false);
    }
};


  if (loading) return <ActivityIndicator size="large" />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: produto.thumbnail }} style={styles.image} />
      <Text style={styles.title}>{produto.title}</Text>

      <View style={styles.priceContainer}>
        <Text style={styles.discountPrice}>R$ {precoDesconto}</Text>
        <Text style={styles.originalPrice}>R$ {produto.price.toFixed(2)}</Text>
      </View>

      <Text style={styles.description}>{produto.description}</Text>

      {/* Botão Editar (CORRETO) */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('Editar', { id: produto.id })}
      >
        <Icon name="edit" size={18} color="#fff" style={{ marginRight: 6 }} />
        <Text style={styles.buttonText}>Editar</Text>
      </TouchableOpacity>

      {/* Botão Excluir */}
      <TouchableOpacity style={styles.deleteButton} onPress={() => setShowDeleteModal(true)}>
        <Icon name="delete" size={18} color="#fff" style={{ marginRight: 6 }} />
        <Text style={styles.buttonText}>Excluir</Text>
      </TouchableOpacity>

      {/* Modal Excluir */}
      <Modal transparent visible={showDeleteModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Excluir produto</Text>
            <Text style={styles.modalText}>
              Você tem certeza que deseja excluir esse produto? Essa ação não poderá ser desfeita.
            </Text>
            <View style={styles.modalButtons}>
              <Pressable onPress={() => setShowDeleteModal(false)} style={styles.cancelButton}>
                <Text style={styles.cancelText}>Cancelar</Text>
              </Pressable>
              <Pressable onPress={handleDelete} style={styles.confirmDeleteButton}>
                <Text style={styles.confirmText}>Excluir</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  discountPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    marginRight: 10,
  },
  originalPrice: {
    fontSize: 16,
    color: '#888',
    textDecorationLine: 'line-through',
  },
  description: {
    fontSize: 14,
    textAlign: 'justify',
    marginBottom: 30,
  },
  editButton: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#2563EB',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    width: '100%',
    justifyContent: 'center',
    marginBottom: 12,
    gap: 10,
  },
  deleteButton: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#DC2626',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    width: '100%',
    justifyContent: 'center',
    gap: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000aa',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cancelButton: {
    marginRight: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: '#eee',
  },
  confirmButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  confirmDeleteButton: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  cancelText: {
    color: '#333',
  },
  confirmText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
