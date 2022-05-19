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
import {cpf} from 'cpf-cnpj-validator';

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
import {InputMask} from '../../../components/InputMask';

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório.'),
  cpf: Yup.string().test('is-cpf', 'CPF inválido.', (value: any) =>
    cpf.isValid(value),
  ),
  phone: Yup.string().required('Telefone é obrigatório.'),
});

export function RegisterPessoalData() {
  const navigation = useNavigation();

  const theme = useTheme();

  function handlerBackButton() {
    navigation.navigate('Register' as never);
  }

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = () => navigation.navigate('RegisterLocale' as never);

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
            <CenterCircle source={theme.icons.check} />
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
        <Image source={theme.icons.womanup} style={{marginTop: RFValue(6)}} />

        <Controller
          control={control}
          rules={{required: true}}
          render={({field: {onChange, value}}) => (
            <Input
              control={control}
              editable={!isLoading}
              error={errors.name && errors.name.message}
              keyboardType="email-address"
              placeholder="Nome"
              source={theme.icons.name}
              name="name"
              onChangeText={onChange}
              value={value}
            />
          )}
          name="name"
        />

        <Controller
          control={control}
          rules={{required: true}}
          render={({field: {onChange, value}}) => (
            <Input
              control={control}
              editable={!isLoading}
              error={errors.cpf && errors.cpf.message}
              keyboardType="email-address"
              placeholder="CPF"
              source={theme.icons.cpf}
              name="cpf"
              onChangeText={onChange}
              value={cpf.format(value)}
              maxLength={14}
            />
          )}
          name="cpf"
        />

        <Controller
          control={control}
          rules={{required: true}}
          render={({field: {onChange, value}}) => (
            <InputMask
              source={theme.icons.phone}
              error={errors.phone && errors.phone.message}
              editable={!isLoading}
              onChangeText={onChange}
              value={value}
              placeholder="Telefone"
            />
            // <Input
            //   control={control}
            //   editable={!isLoading}
            //   error={errors.phone && errors.phone.message}
            //   keyboardType="email-address"
            //   placeholder="Telefone"
            //   source={theme.icons.phone}
            //   name="phone"
            //   onChangeText={onChange}
            //   value={value}
            //   maxLength={11}
            // />
          )}
          name="phone"
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
