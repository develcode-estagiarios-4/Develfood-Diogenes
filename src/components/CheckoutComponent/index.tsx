import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {useTheme} from 'styled-components';
import {useCreateCart} from '../../global/Context/Cart';
import {
  Container,
  WrapperCartComponent,
  DollarIcon,
  EndOrder,
  TotalPrice,
} from './styles';

interface Props {
  onPress: () => void;
}

export function CheckoutComponent({onPress}: Props) {
  const theme = useTheme();

  const {total} = useCreateCart();

  function priceConverter() {
    const priceWZeros = parseFloat(total.toString()).toFixed(2);
    const priceFormatted = priceWZeros.toString().replace('.', ',');
    return priceFormatted;
  }
  const priceFormatted = priceConverter();

  return (
    <WrapperCartComponent>
      <Container>
        <DollarIcon source={theme.icons.dollar} />
        <EndOrder>Finalizar Pedido</EndOrder>
        <TotalPrice>R$ {priceFormatted}</TotalPrice>
      </Container>
    </WrapperCartComponent>
  );
}
