import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useForm} from 'react-hook-form';
import {useTheme} from 'styled-components';
import {BackButton} from '../../../components/BackButton';
import {ContinueButton} from '../../../components/ContinueButton';
import {useCreateUser} from '../../../global/Context/createUserAuth';
import {
  Container,
  Header,
  TittleWrapper,
  Title,
  Text,
  SubTitle,
  WrapperText,
  WrapperTitle,
  Content,
  WomanImage,
} from './styles';

export function RegisterSuccess() {
  const navigation = useNavigation();

  const theme = useTheme();

  const {createUserAccount, loading} = useCreateUser();

  function handlerBackButton() {
    navigation.navigate('Login' as never);
  }

  const {handleSubmit} = useForm();

  const onSubmit = (value: any) => {
    createUserAccount(value);
    navigation.navigate('Login' as never);
  };

  return (
    <Container>
      <Header>
        <BackButton onPressed={handlerBackButton} name="exit" />
        <TittleWrapper>
          <Title>Cadastro</Title>
        </TittleWrapper>
      </Header>

      <WomanImage source={theme.icons.womansuccess} />

      <Content>
        <WrapperTitle>
          <SubTitle>Cadastro Finalizado!</SubTitle>
        </WrapperTitle>

        <WrapperText>
          <Text>
            Parabéns! Agora você pode aproveitar nossas ofertas e serviços e
            economizar com super cupons Develfood.
          </Text>
        </WrapperText>
      </Content>

      <ContinueButton
        title="Continuar"
        onPressed={handleSubmit(onSubmit)}
        loading={loading}
      />
    </Container>
  );
}
