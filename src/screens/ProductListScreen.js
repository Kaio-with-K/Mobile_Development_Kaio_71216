import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FAB } from 'react-native-paper';

export default function ProductListScreen({ categoria = 'mens-shirts' }) {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/category/${categoria}`)
      .then((response) => setProdutos(response.data.products))
      .catch((error) => {
        console.error(error);
        alert('Erro ao carregar produtos');
      })
      .finally(() => setLoading(false));
  }, [categoria]);

  const renderItem = ({ item }) => {
    const precoComDesconto = (item.price * (1 - item.discountPercentage / 100)).toFixed(2);
    const precoOriginal = Number(item.price).toFixed(2);

    return (
      <TouchableOpacity onPress={() => navigation.navigate('Detalhes', { id: item.id })} style={styles.itemContainer}>
        <View style={styles.card}>
          <Image source={{ uri: item.thumbnail }} style={styles.image} />
          <Text style={styles.nome} numberOfLines={2}>{item.title}</Text>
          <Text style={styles.descricao} numberOfLines={2}>{item.description}</Text>
          <View style={styles.precoContainer}>
            <Text style={styles.preco}>R$ {precoComDesconto}</Text>
            <Text style={styles.precoOriginal}>R$ {precoOriginal}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={produtos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={styles.lista}
        />
      )}

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('Novo Produto')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  lista: {
    paddingHorizontal: 16,
    paddingBottom: 100,
    paddingTop: 10,
  },
  itemContainer: {
    width: '50%',
    padding: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    padding: 12,
    height: 230,
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  image: {
    width: '100%',
    height: 90,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  nome: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 2,
  },
  descricao: {
    fontSize: 11,
    color: '#666',
    marginBottom: 6,
    lineHeight: 14,
  },
  precoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  preco: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 6,
  },
  precoOriginal: {
    fontSize: 11,
    color: '#888',
    textDecorationLine: 'line-through',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 90,
    backgroundColor: '#2563EB',
  },
});
