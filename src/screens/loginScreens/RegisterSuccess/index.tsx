import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useForm} from 'react-hook-form';
import {BackButton} from '../../../components/BackButton';
import {ContinueButton} from '../../../components/ContinueButton';
import {useCreateUser} from '../../../global/Context/createUserAuth';
import {Container, Header, TittleWrapper, Title} from './styles';

export function RegisterSuccess() {
  const navigation = useNavigation();

  const {createUserAccount, loading} = useCreateUser();

  function handlerBackButton() {
    navigation.navigate('Login' as never);
  }

  const {handleSubmit} = useForm();

  const onSubmit = (value: any) => {
    createUserAccount({...value});
    navigation.navigate('RegisterPessoalData' as never);
  };

  return (
    <Container>
      <Header>
        <BackButton onPressed={handlerBackButton} name="exit" />
        <TittleWrapper>
          <Title>Cadastro</Title>
        </TittleWrapper>
      </Header>
      <ContinueButton
        title="Continuar"
        onPressed={handleSubmit(onSubmit)}
        loading={loading}
      />
    </Container>
  );
}
