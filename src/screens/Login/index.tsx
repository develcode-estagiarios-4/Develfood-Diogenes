import React, {useEffect} from 'react';
import {useTheme} from 'styled-components';
import RNBootSplash from 'react-native-bootsplash';
import {
  ActivityIndicator,
  Keyboard,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import {Error} from '../../components/Input/styles';
import {Input} from '../../components/Input';
import {usePost} from '../../global/services/post';

import {
  Container,
  Content,
  Hamburger,
  HalfPizza,
  FooterImage,
  LogoImage,
  FogotPassButton,
  ForgotPass,
  LoginButton,
  ButtonTitleLogin,
  WrapperRegister,
  RegisterSimpleTitle,
  RegisterButtonTitle,
  ButtonTitle,
} from './styled';

interface CreateUserRequest {
  email: string;
  password: string;
}

interface UserData {
  token: string;
  type: string;
}

const schema = Yup.object().shape({
  email: Yup.string().email().required('Email é obrigatório.'),
  password: Yup.string().typeError('Informe sua senha.').required(),
});

export function Login() {
  useEffect(() => {
    RNBootSplash.hide({fade: true});
  }, []);

  const {data, loading, handlerPost} = usePost<CreateUserRequest, UserData>(
    '/auth',
    {
      email: 'exemplo@email.com',
      password: '123456',
    },
  );

  const theme = useTheme();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <>
          <Hamburger source={theme.images.hamburger} />
          <HalfPizza source={theme.images.pizza} />
          <Content>
            <LogoImage source={theme.images.develfood} />

            <Input
              name="email"
              control={control}
              error={errors.email && <Error>E-mail é obrigatório</Error>}
            />

            <Input
              name="password"
              control={control}
              error={errors.password && <Error>Senha é obrigatório</Error>}
            />

            <FogotPassButton>
              <ForgotPass>Esqueci minha senha</ForgotPass>
            </FogotPassButton>

            <LoginButton onPress={handleSubmit(handlerPost)}>
              {loading ? (
                <ActivityIndicator color={theme.colors.background} />
              ) : (
                <ButtonTitleLogin>Entrar</ButtonTitleLogin>
              )}
            </LoginButton>

            <WrapperRegister>
              <RegisterSimpleTitle>Não possui cadastro?</RegisterSimpleTitle>
              <RegisterButtonTitle>
                <ButtonTitle> Cadastre-se aqui!</ButtonTitle>
              </RegisterButtonTitle>
            </WrapperRegister>

            <View>
              <Text>{data.token}</Text>
              <Text>{data.type}</Text>
            </View>
          </Content>
          <FooterImage source={theme.images.footer} />
        </>
      </Container>
    </TouchableWithoutFeedback>
  );
}
