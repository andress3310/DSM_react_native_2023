import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import Campobase from './componentes/CampobaseComponent';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import { usePreventScreenCapture } from 'expo-screen-capture';
import NetInfo from '@react-native-community/netinfo';
import * as Haptics from 'expo-haptics';


const store = ConfigureStore();

export default function App() {
  usePreventScreenCapture();
  const unsubscribe = NetInfo.addEventListener(state => {
    if (!state.isConnected){
      Alert.alert('Desconectado', 'Conéctese a internet para actualizar los datos de la aplicación', [
        {text: 'OK'},
      ]);
      Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Error
      )
    }
  });
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