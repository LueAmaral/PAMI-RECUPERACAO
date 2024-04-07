import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';


function Welcome() {
  
  const navigation = useNavigation();
  const {toggleThemeType} = useTheme();

  return (
    <SafeAreaView style={styles.container}>
      <Button
        icon="theme-light-dark"
        mode="contained"
        buttonColor=""
        onPress={toggleThemeType}
        style={styles.temaButton}
      >
        Tema
      </Button>

      <Text variant="displayLarge">Olá!</Text>

      <View>
        <Button
          icon="account-plus"
          mode="contained"
          buttonColor=""
          onPress={() => {
            // @ts-ignore
            navigation.navigate('Join')
          }}
          style={styles.button}
        >
          Ingressar
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
  },
  temaButton: {
    width: 100,
    marginBottom: 16,
    alignSelf: 'flex-end',
  },
  button: {
    width: '100%',
    marginBottom: 16,
  }
});

export default Welcome;