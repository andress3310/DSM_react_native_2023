import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Campobase from './componentes/CampobaseComponent';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import { usePreventScreenCapture } from 'expo-screen-capture';

const store = ConfigureStore();

export default function App() {
  usePreventScreenCapture();
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Campobase />
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});