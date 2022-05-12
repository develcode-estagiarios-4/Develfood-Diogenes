import React from 'react';
import {useState} from 'react';
import {useTheme} from 'styled-components';

import {
  Container,
  InputLogin,
  LoginIcon,
  Validation,
  IconPassword,
  LogoHide,
} from './styles';

interface Props {
  name: string;
}

export function Input({name}: Props) {
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
              : null
          }
        />
        <InputLogin
          placeholder={name === 'email' ? 'exemplo@email.com' : '********'}
          autoCapitalize="none"
          keyboardType={name === 'email' ? 'email-address' : 'default'}
          secureTextEntry={name === 'password' ? data.secureTextEntry : false}
        />
        <IconPassword onPress={() => updateSecureTextEntry()}>
          <LogoHide source={name === 'password' ? theme.icons.eye : null} />
        </IconPassword>
      </Container>
      {name === 'email' ? (
        data.isValidEmail
      ) : name === 'password' ? (
        data.isValidPassword
      ) : (
        <Validation>
          {name === 'email'
            ? 'Email Invalido'
            : name === 'password'
            ? 'Senha invalida'
            : null}
        </Validation>
      )}
    </>
  );
}
