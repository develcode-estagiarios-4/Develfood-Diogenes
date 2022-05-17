import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {BackButton} from '../../../components/BackButton';
import {Container, Header, TittleWrapper, Title} from './styles';

export function RegisterSuccess() {
  const navigation = useNavigation();

  function handlerBackButton() {
    navigation.navigate('Login' as never);
  }

  return (
    <Container>
      <Header>
        <BackButton onPressed={handlerBackButton} name="exit" />
        <TittleWrapper>
          <Title>Cadastro</Title>
        </TittleWrapper>
      </Header>
    </Container>
  );
}
