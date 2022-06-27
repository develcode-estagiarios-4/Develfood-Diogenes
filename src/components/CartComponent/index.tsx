import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {useTheme} from 'styled-components';
import {useCreateCart} from '../../global/Context/Cart';
import {
  Container,
  WrapperCartComponent,
  HamperImage,
  ItemsCircle,
  WrapperImage,
  CartItems,
  GoToCart,
  ShowCart,
  TotalPrice,
} from './styles';

interface CartProps {
  BottomBar: boolean;
}

export function CartComponent({BottomBar}: CartProps) {
  const theme = useTheme();

  const {totalItems, total} = useCreateCart();

  function priceConverter() {
    const priceWZeros = parseFloat(String(total)).toFixed(2);
    const priceFormatted = priceWZeros.toString().replace('.', ',');
    return priceFormatted;
  }
  const priceFormatted = priceConverter();

  return (
    <WrapperCartComponent bottom={BottomBar ? RFValue(95) : RFValue(50)}>
      <Container>
        <HamperImage source={theme.icons.hamper} />
        <WrapperImage>
          {totalItems > 0 && totalItems <= 9 ? (
            <>
              <ItemsCircle>
                <CartItems>{totalItems}</CartItems>
              </ItemsCircle>
            </>
          ) : totalItems > 9 ? (
            <>
              <ItemsCircle>
                <CartItems>9+</CartItems>
              </ItemsCircle>
            </>
          ) : (
            <ItemsCircle />
          )}
        </WrapperImage>

        <GoToCart>
          <ShowCart>Ver Carrinho</ShowCart>
        </GoToCart>

        <TotalPrice>R$ {priceFormatted}</TotalPrice>
      </Container>
    </WrapperCartComponent>
  );
}
