import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PaperProvider, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';


function JoinList() {
  const {theme} = useTheme();
  
  return (
      <PaperProvider
      theme={theme}
      >
        <Text variant="displayLarge">Olá!</Text>

      </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default JoinList;