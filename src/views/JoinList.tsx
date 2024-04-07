import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { PaperProvider, Text, Card } from 'react-native-paper';
import { useTheme } from '../context/ThemeContext';
import { useRoute } from '@react-navigation/native';

function JoinList() {
  const {theme} = useTheme();

  const route = useRoute();
  // @ts-ignore
  const {dataArray} = route.params;

  return (
    <PaperProvider
      theme={theme}
    >
      <FlatList
        data={dataArray}
        renderItem={({item}) => (
          <Card
            style={styles.card}
          >
            <Card.Content
                style={styles.card}
            >
              <Text style={{textAlign: 'center'}} >
                <Text style={{fontWeight: 'bold'}}>Nº da Inscrição: </Text>
                {item.id}
              </Text>
              <Text>
                <Text style={{fontWeight: 'bold'}}>Nome: </Text>
                {item.nome}
              </Text>
              <Text>
                <Text style={{fontWeight: 'bold'}}>RG: </Text>
                {item.rg}
              </Text>
              <Text>
                <Text style={{fontWeight: 'bold'}}>Data de Nascimento: </Text>
                {item.dataNascimento}
              </Text>
              <Text>
                <Text style={{fontWeight: 'bold'}}>Celular: </Text>
                {item.celular}
              </Text>
              <Text>
                <Text style={{fontWeight: 'bold'}}>Telefone: </Text>
                {item.telefone}
              </Text>
              <Text>
                <Text style={{fontWeight: 'bold'}}>Email: </Text>
                {item.email}
              </Text>
              <Text>
                <Text style={{fontWeight: 'bold'}}>Endereço: </Text>
                {item.endereco}
              </Text>
              <Text>
                <Text style={{fontWeight: 'bold'}}>Curso: </Text>
                {item.curso}
              </Text>
            </Card.Content>
          </Card>
        )}
        keyExtractor={item => item.id}
      />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    margin: 12,
  },
});

export default JoinList;