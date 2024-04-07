import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Menu, Button, Dialog, Portal, Paragraph } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import { NavigationProp, useNavigation } from '@react-navigation/native';

interface Elemento {
  id: string;
  nome: string;
  rg: string;
  dataNascimento: string;
  celular: string;
  telefone: string;
  email: string;
  endereco: string;
  curso: string;
}

function calcularIdade(dataNascimento: string): number {
  // Separa a data em dia, mês e ano
  const [day, month, year] = dataNascimento.split("/").map(Number);
  // Verifica o dia de hoje
  const today = new Date();
  // Cria a data de nascimento
  const birthDate = new Date(year, month - 1, day);
  // Calcula a idade
  let idade = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  
  // Se a data de hoje for menor que a data de nascimento, diminui 1 da idade
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    idade--;
  }

  return idade;
}

function Join() {
  // Variaveis do formulario
  const [rg, setRg] = React.useState('');
  const [nome,setNome] = React.useState('');
  const [dataNascimento, setDataNascimento] = React.useState('');
  const [celular, setCelular] = React.useState('');
  const [telefone, setTelefone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [endereco, setEndereco] = React.useState('');
  const [curso, setCurso] = React.useState('');
  const [maiorDeIdade, setMaiorDeIdade] = React.useState(false);
  const [inscricoes, setInscricoes] = React.useState<Elemento[]>([]);

  // Função para mudar a data de nascimento e verificar se é maior de idade
  const mudancaData = (date: string) => {
    setDataNascimento(date);
    const idade = calcularIdade(date);
    setMaiorDeIdade(idade >= 18);
  };

  // Ir para a lista de inscrições e enviar o array de inscrições
  const irParaLista = () => {
    navigation.navigate('JoinList', { dataArray: inscricoes });
  };

  // Função para enviar os dados
  const enviar = () => {
    if (rg.trim() !== '' &&
    nome.trim() !== '' &&
    dataNascimento.trim() !== '' &&
    celular.trim() !== '' &&
    telefone.trim() !== '' &&
    email.trim() !== '' &&
    endereco.trim() !== '' &&
    curso.trim() !== '') {
      if (maiorDeIdade) {
        adcElemento();
        abrirDialogo("Inscrição realizada com sucesso!");
      } else {
        abrirDialogo("Você precisa ser maior de idade para se inscrever!");
      }
    } else {
      abrirDialogo("Preencha todos os campos!");
    }
  };
  
  // Adicionar elementos ao array de inscrições e limpar os campos
  const adcElemento = () => {
    const dados = {
      id: String(new Date().getTime()),
      nome: nome,
      rg: rg,
      dataNascimento: dataNascimento,
      celular: celular,
      telefone: telefone,
      email: email,
      endereco: endereco,
      curso: curso,
    };
    setInscricoes([...inscricoes, dados]);
    setRg('');
    setNome('');
    setDataNascimento('');
    setCelular('');
    setTelefone('');
    setEmail('');
    setEndereco('');
    setCurso('');
  };
  
  // Funções de navegação
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  type RootStackParamList = {
    JoinList: { dataArray: Elemento[] };
  };

  // Mostrar menu de cursos
  const [mostrarMenu, setMostrarMenu] = React.useState(false);
  const abrirMenu = () => setMostrarMenu(true);
  const fecharMenu = () => setMostrarMenu(false);

  // Mostrar dialogo e deixar o texto dinamico
  const [textoDialogo, setTextoDialogo] = useState('');
  const [mostrarDialogo, setMostrarDialogo] = React.useState(false);
  const abrirDialogo = (message: string) => {
    setTextoDialogo(message);
    setMostrarDialogo(true);
  };
  const fecharDialogo = () => setMostrarDialogo(false);

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets={true}
      style={styles.container}
    >

      {/* RG */}
      <TextInput
        label={'RG'}
        value={rg}
        mode='outlined'
        onChangeText={setRg}
        placeholder="11.111.111-1"
        style={styles.input}
        left={
          <TextInput.Icon
            icon="id-card"
          />
        }
        render={props =>
          // @ts-ignore
          <TextInputMask
            {...props}
            type={'custom'}
            options={{
              mask: '99.999.999-9',
            }}
          />
        }
      />

      {/* Nome */}
      <TextInput
        label={'Nome'}
        mode='outlined'
        value={nome}
        onChangeText={setNome}
        placeholder='Nome'
        style={styles.input}
        left={
          <TextInput.Icon
            icon="account"
          />
        }
      />

      {/* Data de nascimento */}
      <TextInput
        label={'Data de Nascimento'}
        mode='outlined'
        value={dataNascimento}
        onChangeText={mudancaData}
        placeholder='DD/MM/AAAA'
        keyboardType="numeric"
        style={styles.input}
        left={
          <TextInput.Icon
            icon="calendar"
          />
        }
        render={props =>
          // @ts-ignore
          <TextInputMask
            {...props}
            type={'datetime'}
            options={{
              format: 'DD/MM/YYYY'
            }}
          />
        }
      />

      {/* Celular */}
      <TextInput
        label={'Celular'}
        mode='outlined'
        value={celular}
        onChangeText={setCelular}
        placeholder='(99) 99999-9999'
        keyboardType="numeric"
        style={styles.input}
        left={
          <TextInput.Icon
            icon="cellphone"
          />
        }
        render={props =>
          // @ts-ignore
          <TextInputMask
            {...props}
            type={'cel-phone'}
            options={{
              maskType: 'BRL',
              withDDD: true,
              dddMask: '(99) ',
            }}
          />
        }
      />

      {/* Telefone */}
      <TextInput
        label={'Telefone'}
        mode='outlined'
        value={telefone}
        onChangeText={setTelefone}
        placeholder='(99) 99999-9999'
        keyboardType="numeric"
        style={styles.input}
        left={
          <TextInput.Icon
            icon="phone"
          />
        }
        render={props =>
            // @ts-ignore
          <TextInputMask
            {...props}
            type={'cel-phone'}
            options={{
              maskType: 'BRL',
              withDDD: true,
              dddMask: '(99) ',
            }}
          />
        }
      />

      {/* Email */}
      <TextInput
        label={'E-mail'}
        mode='outlined'
        value={email}
        onChangeText={setEmail}
        placeholder='email@email.com'
        style={styles.input}
        left={
          <TextInput.Icon
            icon="email"
          />
        }
      />

      {/* Endereço */}
      <TextInput
        label={'Endereço'}
        mode='outlined'
        value={endereco}
        onChangeText={setEndereco}
        placeholder='Rua das Arvores, nº 0, São Paulo - SP'
        style={styles.input}
        left={
          <TextInput.Icon
            icon="map-marker"
          />
        }
      />

      {/* Curso */}
      <TextInput
        label={'Curso'}
        mode='outlined'
        value={curso}
        onChangeText={setCurso}
        placeholder='Curso'
        editable={false}
        style={styles.input}
        left={
          <TextInput.Icon
            icon="bag-personal"
          />
        }
        right={
          <TextInput.Icon
            icon="menu-down"
            onPress={abrirMenu}
          />
        }
      />
      <Menu
        visible={mostrarMenu}
        onDismiss={fecharMenu}
        anchor={<Text onPress={abrirMenu} style={styles.hideit} >Abrir Menu</Text>}
      >
        <Menu.Item onPress={() => {setCurso('Administração'); fecharMenu();}} title="Administração" />
        <Menu.Item onPress={() => {setCurso('Desenvolvimento de Sistemas'); fecharMenu();}} title="Desenvolvimento de Sistemas" />
        <Menu.Item onPress={() => {setCurso('Enfermagem'); fecharMenu();}} title="Enfermagem" />
      </Menu>

      <Button
        icon="send"
        mode='contained'
        onPress={enviar}
        style={styles.input}
      >
        Enviar
      </Button>

      <Button
        icon="clipboard-list-outline"
        mode='outlined'
        onPress={irParaLista}
      >
        Lista
      </Button>

      <Portal>
        <Dialog visible={mostrarDialogo} onDismiss={fecharDialogo} style={styles.dialog} >
          <Dialog.Content>
            <Paragraph>{textoDialogo}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={fecharDialogo}>Fechar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  card: {
    borderRadius: 16,
    margin: 12,
  },
  input: {
    marginBottom: 10,
  },
  hideit: {
    fontSize: 1,
  },
  dialog: {
    borderRadius: 24,
  },
});

export default Join;