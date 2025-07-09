import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductListScreen from './ProductListScreen';

export default function HomeScreen() {
  const [categoria, setCategoria] = useState('mens-shirts');

  return (
    <SafeAreaView style={styles.container}>
      {/* Abas de categorias */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, categoria === 'mens-shirts' && styles.activeTab]}
          onPress={() => setCategoria('mens-shirts')}
        >
          <Text
            style={[
              styles.tabText,
              categoria === 'mens-shirts' && styles.activeTabText,
            ]}
          >
            Produtos Masculinos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, categoria === 'womens-dresses' && styles.activeTab]}
          onPress={() => setCategoria('womens-dresses')}
        >
          <Text
            style={[
              styles.tabText,
              categoria === 'womens-dresses' && styles.activeTabText,
            ]}
          >
            Produtos Femininos
          </Text>
        </TouchableOpacity>
      </View>

      {/* Lista de produtos conforme categoria */}
      <ProductListScreen categoria={categoria} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#fff',
  },
  tab: {
    marginHorizontal: 16,
    paddingBottom: 6,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: '#2563EB',
  },
  activeTabText: {
    color: '#2563EB',
  },
});
