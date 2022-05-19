import React, {useEffect} from 'react';
import {useTheme} from 'styled-components';
import RNBootSplash from 'react-native-bootsplash';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {useAuth} from '../../../global/Context';
import {useNavigation} from '@react-navigation/native';
import {Input} from '../../../components/Input';

import {
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

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

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Digite um email válido.')
    .required('Email é obrigatório.'),
  password: Yup.string()
    .min(6, 'Minimo de 6 caracteres.')
    .required('Senha é obrigatória.'),
});

export function Login() {
  useEffect(() => {
    RNBootSplash.hide({fade: true});
  }, []);

  const theme = useTheme();

  const navigation = useNavigation();

  const {userLogin, loading} = useAuth();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (value: any) => {
    userLogin({
      email: value.email,
      password: value.password,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <>
          <Hamburger
            source={theme.images.hamburger}
            style={{height: RFValue(210), width: RFValue(75)}}
          />
          <HalfPizza
            source={theme.images.pizza}
            style={{height: RFValue(280), width: RFValue(130)}}
          />
          <Content>
            <LogoImage source={theme.images.develfood} />
            <Controller
              control={control}
              rules={{required: true}}
              render={({field: {onChange, value}}) => (
                <Input
                  control={control}
                  editable={!loading}
                  error={errors.email && errors.email.message}
                  keyboardType="email-address"
                  placeholder="exemplo@email.com"
                  source={theme.icons.email}
                  name="email"
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="email"
            />

            <Controller
              control={control}
              rules={{required: true}}
              render={({field: {onChange, value}}) => (
                <Input
                  control={control}
                  editable={!loading}
                  error={errors.password && errors.password.message}
                  keyboardType="default"
                  placeholder="senha"
                  source={theme.icons.password}
                  name="password"
                  onChangeText={onChange}
                  value={value}
                  sourcePassword={theme.icons.eye}
                />
              )}
              name="password"
            />
            <FogotPassButton>
              <ForgotPass>Esqueci minha senha</ForgotPass>
            </FogotPassButton>
            <LoginButton onPress={handleSubmit(onSubmit)}>
              {loading ? (
                <ActivityIndicator color={theme.colors.background} />
              ) : (
                <ButtonTitleLogin>Entrar</ButtonTitleLogin>
              )}
            </LoginButton>
            <WrapperRegister>
              <RegisterSimpleTitle>Não possui cadastro?</RegisterSimpleTitle>
              <RegisterButtonTitle
                onPress={() => {
                  navigation.navigate('Register' as never);
                }}>
                <ButtonTitle> Cadastre-se aqui!</ButtonTitle>
              </RegisterButtonTitle>
            </WrapperRegister>
          </Content>
          <FooterImage
            source={theme.images.footer}
            style={{height: RFValue(210), width: RFPercentage(45)}}
          />
        </>
      </Container>
    </TouchableWithoutFeedback>
  );
}
