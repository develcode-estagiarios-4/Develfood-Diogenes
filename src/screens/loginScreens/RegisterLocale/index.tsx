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

        <Controller
          control={control}
          rules={{required: true}}
          render={({field: {onChange, value}}) => (
            <Input
              control={control}
              editable={!isLoading}
              error={errors.street && errors.street.message}
              keyboardType="email-address"
              placeholder="Rua"
              source={theme.icons.locale}
              name="street"
              onChangeText={onChange}
              value={value}
            />
          )}
          name="street"
        />

        <Controller
          control={control}
          rules={{required: true}}
          render={({field: {onChange, value}}) => (
            <Input
              control={control}
              editable={!isLoading}
              error={errors.city && errors.city.message}
              keyboardType="email-address"
              placeholder="Cidade"
              source={theme.icons.locale}
              name="city"
              onChangeText={onChange}
              value={value}
            />
          )}
          name="city"
        />

        <Controller
          control={control}
          rules={{required: true}}
          render={({field: {onChange, value}}) => (
            <Input
              control={control}
              editable={!isLoading}
              error={errors.neighborhood && errors.neighborhood.message}
              keyboardType="email-address"
              placeholder="Bairro"
              source={theme.icons.locale}
              name="neighborhood"
              onChangeText={onChange}
              value={value}
            />
          )}
          name="neighborhood"
        />

        <Controller
          control={control}
          rules={{required: true}}
          render={({field: {onChange, value}}) => (
            <Input
              control={control}
              editable={!isLoading}
              error={errors.number && errors.number.message}
              keyboardType="email-address"
              placeholder="Numero"
              source={theme.icons.locale}
              name="number"
              onChangeText={onChange}
              value={value}
            />
          )}
          name="number"
        />

        <Controller
          control={control}
          rules={{required: true}}
          render={({field: {onChange, value}}) => (
            <Input
              control={control}
              editable={!isLoading}
              error={errors.cep && errors.cep.message}
              keyboardType="email-address"
              placeholder="CEP"
              source={theme.icons.locale}
              name="cep"
              onChangeText={onChange}
              value={value}
              maxLength={8}
            />
          )}
          name="cep"
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