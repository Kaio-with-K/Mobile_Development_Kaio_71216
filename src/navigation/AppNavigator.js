import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import NewProduct from '../screens/NewProduct';
import Tabs from './Tabs'; 
import EditProductScreen from '../screens/EditProductScreen';
import SettingsScreen from '../screens/SettingsScreen';



const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
        <Stack.Screen name="Detalhes" component={ProductDetailScreen} options={{ headerTitle: '', headerBackTitleVisible: false }} />
        <Stack.Screen name="Novo Produto" component={NewProduct} options={{ headerShown: false }}/>
        <Stack.Screen name="Editar" component={EditProductScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Configurações" component={SettingsScreen} options={{ headerShown: false }} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}
