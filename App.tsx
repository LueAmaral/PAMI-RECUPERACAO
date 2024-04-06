import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Text, Button, Title } from 'react-native-paper';
import { ThemeContextProvider, useTheme } from './src/context/ThemeContext';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './src/views/Welcome';
import Join from './src/views/Join';
import JoinList from './src/views/JoinList';

type RootStackParamList = {
  Join: undefined;
  JoinList: undefined;
  Welcome: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function App() {
  const { themeType } = useTheme();
  
  return (
    <ThemeContextProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Join"
            component={Join}
            options={{ title: 'Ingressar'}}
          />
          <Stack.Screen
            name="JoinList"
            component={JoinList}
            options={{ title: 'Lista de Inscrições'}}
          />
        </Stack.Navigator>
    </ThemeContextProvider>
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

export default App;