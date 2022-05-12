import React, {useEffect} from 'react';
import {useTheme} from 'styled-components';
import RNBootSplash from 'react-native-bootsplash';
import LottieView from 'lottie-react-native';
import {Text, View} from 'react-native';

import {Input} from '../../components/Input';
import {usePost} from '../../global/services/post';

import {
  SplashScreen,
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

  return (
    <Container>
      {loading ? (
        <SplashScreen>
          <LottieView
            source={require('../../global/assets/loading.json')}
            autoPlay
            loop={false}
          />
        </SplashScreen>
      ) : (
        <>
          <Hamburger source={theme.images.hamburger} />
          <HalfPizza source={theme.images.pizza} />
          <Content>
            <LogoImage source={theme.images.develfood} />

            <Input name="email" />

            <Input name="password" />

            <FogotPassButton>
              <ForgotPass>Esqueci minha senha</ForgotPass>
            </FogotPassButton>

            <LoginButton onPress={() => handlerPost()}>
              <ButtonTitleLogin>Entrar</ButtonTitleLogin>
            </LoginButton>

            <View>
              <Text>{data.token}</Text>
              <Text>{data.type}</Text>
            </View>

            <WrapperRegister>
              <RegisterSimpleTitle>Não possui cadastro?</RegisterSimpleTitle>
              <RegisterButtonTitle>
                <ButtonTitle> Cadastre-se aqui!</ButtonTitle>
              </RegisterButtonTitle>
            </WrapperRegister>
          </Content>
          <FooterImage source={theme.images.footer} />
        </>
      )}
    </Container>
  );
}
