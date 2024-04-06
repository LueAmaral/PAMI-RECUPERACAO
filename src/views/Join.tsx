import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import { Text, TextInput, Menu, Button } from 'react-native-paper';
import { useTheme } from '../context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInputMask } from 'react-native-masked-text';

function calcularIdade(birthdate: string): number {
  const [day, month, year] = birthdate.split("/").map(Number);
  const today = new Date();
  const birthDate = new Date(year, month - 1, day);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

function Join() {
  const {theme} = useTheme();

  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const [rg, setRg] = React.useState('');
  const [nome,setNome] = React.useState('');
  const [dataNascimento, setDataNascimento] = React.useState('');
  const [celular, setCelular] = React.useState('');
  const [telefone, setTelefone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [endereco, setEndereco] = React.useState('');
  const [curso, setCurso] = React.useState('');
  const [MaiorDeIdade, setMaiorDeIdade] = React.useState(false);
  
  const mudancaData = (date: string) => {
    setDataNascimento(date);
    const age = calcularIdade(date);
    setMaiorDeIdade(age >= 18);
  };

  const Enviar = () => {
    if (MaiorDeIdade) {
      
      console.log('Dados salvos', {
        rg,
        nome,
        dataNascimento,
        celular,
        telefone,
        email,
        endereco,
        curso
      });
    } else {
      Alert.alert('Você precisa ter mais de 18 anos.');
    }
  };

  return (
      <ScrollView
        automaticallyAdjustKeyboardInsets={true}
        style={styles.container}
      >

        {/* RG */}
        <TextInputMask
          label={'RG'}
          value={rg}
          mode='outlined'
          onChangeText={setRg}
          placeholder="11.111.111-1"
          keyboardType="numeric"
          style={styles.input}
          type={'custom'}
          options={{
            mask: '99.999.999-9',
          }}
        />

        {/* Nome */}
        <TextInput
          label={'Nome'}
          mode='outlined'
          value={nome}
          onChangeText={setNome}
          placeholder='Nome'
          style={styles.input}
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
        />

        {/* Endereço */}
        <TextInput
          label={'Endereço'}
          mode='outlined'
          value={endereco}
          onChangeText={setEndereco}
          placeholder='Rua das Arvores, nº 0, São Paulo - SP'
          style={styles.input}
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
          right={
            <TextInput.Icon
              icon="menu-down"
              onPress={openMenu}
            />
          }
        />
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Text onPress={openMenu} style={styles.hideit} >Abrir Menu</Text>}
        >
          <Menu.Item onPress={() => {setCurso('Administração'); closeMenu();}} title="Administração" />
          <Menu.Item onPress={() => {setCurso('Desenvolvimento de Sistemas'); closeMenu();}} title="Desenvolvimento de Sistemas" />
          <Menu.Item onPress={() => {setCurso('Enfermagem'); closeMenu();}} title="Enfermagem" />
        </Menu>

        <Button
          mode='contained'
          onPress={Enviar}
        >
          Enviar
        </Button>

      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    marginBottom: 10,
  },
  hideit: {
    fontSize: 1,
  },
});

export default Join;
