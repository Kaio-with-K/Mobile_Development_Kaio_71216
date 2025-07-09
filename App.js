import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import React from 'react';
import { Provider } from 'react-redux';
import { Store } from './src/redux/Store';
import AppNavigator from './src/navigation/AppNavigator';

export default function app() {
  return (
    <Provider store={Store}>
      <AppNavigator />
    </Provider>
  );
}




