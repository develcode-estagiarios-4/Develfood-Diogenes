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
  street: Yup.string().required('Rua é obrigatório.'),
  city: Yup.string().required('Cidade é obrigatória.'),
  neighborhood: Yup.string().required('Bairro é obrigatório.'),
  number: Yup.number()
    .required('Numero é obrigatório.')
    .typeError('Apenas numeros são aceitos'),
  cep: Yup.number()
    .required('CEP é obrigatório.')
    .typeError('Apenas numeros são aceitos'),
});

export function RegisterLocale() {
  const navigation = useNavigation();

  const theme = useTheme();

  function handlerBackButton() {
    navigation.navigate('RegisterPessoalData' as never);
  }

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = () => navigation.navigate('RegisterSuccess' as never);

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
            <CenterCircle source={theme.icons.check} />
          </CircleAdjust>
          <CircleAdjust>
            <Circle source={theme.icons.circle} />
            <CenterCircle source={theme.icons.blankcircle} />
          </CircleAdjust>
        </CircleWrapper>
        <Image source={theme.icons.woman} style={{marginTop: RFValue(6)}} />
        <Input
          name="street"
          control={control}
          error={errors.street && errors.street.message}
          editable={!isLoading}
        />
        <Input
          name="city"
          control={control}
          error={errors.city && errors.city.message}
          editable={!isLoading}
        />
        <Input
          name="neighborhood"
          control={control}
          error={errors.neighborhood && errors.neighborhood.message}
          editable={!isLoading}
        />
        <Input
          name="number"
          control={control}
          error={errors.number && errors.number.message}
          editable={!isLoading}
        />
        <Input
          name="CEP"
          control={control}
          error={errors.cep && errors.cep.message}
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
