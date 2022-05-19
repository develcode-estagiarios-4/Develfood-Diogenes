import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {useTheme} from 'styled-components';
import {BackButton} from '../../../components/BackButton';
import {Input} from '../../../components/Input';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import {useState} from 'react';
import {ContinueButton} from '../../../components/ContinueButton';

import {
  Image,
  Keyboard,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';

import {
  Container,
  Header,
  TittleWrapper,
  Title,
  CircleWrapper,
  CircleAdjust,
  Circle,
  CenterCircle,
} from './styles';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Digite um email válido.')
    .required('Email é obrigatório.'),
  password: Yup.string()
    .min(6, 'Minimo de 6 caracteres.')
    .required('Senha é obrigatória.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'As senhas devem ser identicas.')
    .required('Confirmação de senha é obrigatória.'),
});

export function Register() {
  const navigation = useNavigation();

  const theme = useTheme();

  function handlerBackButton() {
    navigation.navigate('Login' as never);
  }

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = () => navigation.navigate('RegisterPessoalData' as never);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setLoading] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
        <Header>
          <BackButton onPressed={handlerBackButton} name="arrow" />
          <TittleWrapper>
            <Title>Cadastro</Title>
          </TittleWrapper>
        </Header>
        <CircleWrapper>
          <CircleAdjust>
            <Circle source={theme.icons.circle} />
            <CenterCircle source={theme.icons.blankcircle} />
          </CircleAdjust>
          <CircleAdjust>
            <Circle source={theme.icons.circle} />
            <CenterCircle source={theme.icons.blankcircle} />
          </CircleAdjust>
          <CircleAdjust>
            <Circle source={theme.icons.circle} />
            <CenterCircle source={theme.icons.blankcircle} />
          </CircleAdjust>
        </CircleWrapper>
        <Image source={theme.icons.womanleft} style={{marginTop: RFValue(6)}} />

        <Controller
          control={control}
          rules={{required: true}}
          render={({field: {onChange, value}}) => (
            <Input
              control={control}
              editable={!isLoading}
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
              editable={!isLoading}
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

        <Controller
          control={control}
          rules={{required: true}}
          render={({field: {onChange, value}}) => (
            <Input
              control={control}
              editable={!isLoading}
              error={errors.confirmPassword && errors.confirmPassword.message}
              keyboardType="default"
              placeholder="comfirmar senha"
              source={theme.icons.password}
              name="password"
              onChangeText={onChange}
              value={value}
              sourcePassword={theme.icons.eye}
            />
          )}
          name="confirmPassword"
        />

        <ContinueButton
          title="Continuar"
          onPressed={handleSubmit(onSubmit)}
          loading={isLoading}
        />
      </Container>
    </TouchableWithoutFeedback>
  );
}
