import React from 'react';
import {useState} from 'react';
import {useTheme} from 'styled-components';
import {Control, Controller} from 'react-hook-form';

import {
  Container,
  InputLogin,
  LoginIcon,
  Error,
  IconPassword,
  LogoHide,
} from './styles';

interface Props {
  name: string;
  control: Control;
  error: string;
  editable: boolean;
}

export function Input({name, control, error, editable}: Props) {
  const theme = useTheme();

  const [data, setData] = useState({
    secureTextEntry: true,
    isValidEmail: true,
    isValidPassword: true,
  });

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  return (
    <>
      <Container>
        <LoginIcon
          source={
            name === 'email'
              ? theme.icons.email
              : name === 'password'
              ? theme.icons.password
              : name === 'confirmPassword'
              ? theme.icons.password
              : name === 'name'
              ? theme.icons.name
              : name === 'phone'
              ? theme.icons.phone
              : name === 'cpf'
              ? theme.icons.cpf
              : theme.icons.locale
          }
        />
        <Controller
          control={control}
          rules={{required: true}}
          render={({field: {onChange, value}}) => (
            <InputLogin
              placeholder={
                name === 'email'
                  ? 'exemplo@email.com'
                  : name === 'password'
                  ? 'senha'
                  : name === 'confirmPassword'
                  ? 'confirmar senha'
                  : name === 'name'
                  ? 'Nome'
                  : name === 'phone'
                  ? 'Telefone'
                  : name === 'cpf'
                  ? 'CPF'
                  : name === 'city'
                  ? 'Cidade'
                  : name === 'street'
                  ? 'Rua'
                  : name === 'number'
                  ? 'Número'
                  : name === 'neighborhood'
                  ? 'Bairro'
                  : 'CEP'
              }
              autoCapitalize="none"
              keyboardType={name === 'email' ? 'email-address' : 'default'}
              secureTextEntry={
                name === 'password'
                  ? data.secureTextEntry
                  : name === 'confirmPassword'
                  ? data.secureTextEntry
                  : false
              }
              onChangeText={onChange}
              value={value}
              editable={editable}
            />
          )}
          name={name}
        />
        <IconPassword onPress={() => updateSecureTextEntry()}>
          <LogoHide
            source={
              name === 'password'
                ? theme.icons.eye
                : name === 'confirmPassword'
                ? theme.icons.eye
                : null
            }
          />
        </IconPassword>
      </Container>
      {error && <Error>{error}</Error>}
    </>
  );
}
