import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {useTheme} from 'styled-components';
import {BackButton} from '../../../components/BackButton';
import {Input} from '../../../components/Input';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
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
  name: Yup.string().required('Nome é obrigatório.'),
  cpf: Yup.number()
    .positive('Apenas numeros positivos.')
    .integer('Apenas numeros inteiros.')
    .required('CPF é obrigatória.')
    .typeError('CPF inválido.'),
  phone: Yup.number().required('Telefone é obrigatório.'),
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
        <Input
          name="name"
          control={control}
          error={errors.name && errors.name.message}
          editable={!isLoading}
        />
        <Input
          name="cpf"
          control={control}
          error={errors.cpf && errors.cpf.message}
          editable={!isLoading}
        />
        <Input
          name="phone"
          control={control}
          error={errors.phone && errors.phone.message}
          editable={!isLoading}
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
