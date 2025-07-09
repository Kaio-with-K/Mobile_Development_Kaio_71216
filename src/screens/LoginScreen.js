import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { login } from '../redux/UserSlice';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erroCampos, setErroCampos] = useState(false);
  const [erroLogin, setErroLogin] = useState(false);
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const handleLogin = () => {
    const camposVazios = email.trim() === '' || senha.trim() === '';
    const credenciaisValidas = email === 'Kaio Santana' && senha === '71216';

    setErroCampos(camposVazios);
    setErroLogin(!camposVazios && !credenciaisValidas);

    if (camposVazios || !credenciaisValidas) return;

    dispatch(login(email));
    navigation.replace('Tabs');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>Bem-vindo de volta!</Text>
        <Text style={styles.subtitle}>
          Insira seus dados para entrar na sua conta.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Username</Text>
        <View
          style={[
            styles.inputContainer,
            erroCampos && email.trim() === '' && styles.inputErroContainer,
          ]}
        >
          <TextInput
            placeholder="Digite seu usuário"
            placeholderTextColor="#9CA3AF"
            style={styles.inputText}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        {erroCampos && email.trim() === '' && (
          <Text style={styles.erroTexto}>Campo obrigatório</Text>
        )}

        <Text style={styles.label}>Senha</Text>
        <View
          style={[
            styles.inputContainer,
            erroCampos && senha.trim() === '' && styles.inputErroContainer,
          ]}
        >
          <TextInput
            placeholder="Digite sua senha"
            placeholderTextColor="#9CA3AF"
            secureTextEntry={!mostrarSenha}
            style={styles.inputText}
            value={senha}
            onChangeText={setSenha}
          />
          <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
            <Ionicons
              name={mostrarSenha ? 'eye-off' : 'eye'}
              size={20}
              color="#9CA3AF"
            />
          </TouchableOpacity>
        </View>
        {erroCampos && senha.trim() === '' && (
          <Text style={styles.erroTexto}>Campo obrigatório</Text>
        )}

        {erroLogin && (
          <Text style={styles.erroTexto}>Usuário ou senha inválidos</Text>
        )}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  topContainer: {
    backgroundColor: '#2563EB',
    minHeight: '50%',
    paddingTop: 165,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
  },

  subtitle: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 30,
  },

  card: {
    backgroundColor: '#fff',
    marginTop: -50,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 14,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },

  label: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 10,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    marginTop: 5,
  },

  inputText: {
    flex: 1,
    paddingVertical: 10,
  },

  inputErroContainer: {
    borderColor: 'red',
  },

  erroTexto: {
    color: 'red',
    fontSize: 12,
    marginTop: 6,
  },

  button: {
    backgroundColor: '#2563EB',
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
