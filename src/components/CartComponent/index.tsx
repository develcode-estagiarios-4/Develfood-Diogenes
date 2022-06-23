import React from 'react';
import {useTheme} from 'styled-components';
import {useCreateCart} from '../../global/Context/Cart';
import {
  Container,
  WrapperCartComponent,
  HamperImage,
  ItemsCircle,
  WrapperImage,
  CartItems,
  WrapperItems,
  GoToCart,
  ShowCart,
  TotalPrice,
  CartItemsEnd,
} from './styles';

export function CartComponent() {
  const theme = useTheme();

  const {totalItems, total} = useCreateCart();

  function priceConverter() {
    const priceWZeros = parseFloat(total).toFixed(2);
    const priceFormatted = priceWZeros.toString().replace('.', ',');
    return priceFormatted;
  }
  const priceFormatted = priceConverter();

  return (
    <WrapperCartComponent>
      <Container>
        <HamperImage source={theme.icons.hamper} />
        <WrapperImage>
          {totalItems > 0 && totalItems <= 9 ? (
            <>
              <ItemsCircle source={theme.icons.itemsCircle} />
              <WrapperItems>
                <CartItems>{totalItems}</CartItems>
              </WrapperItems>
            </>
          ) : totalItems > 9 ? (
            <>
              <ItemsCircle source={theme.icons.itemsCircle} />
              <CartItemsEnd>9+</CartItemsEnd>
            </>
          ) : (
            <ItemsCircle source={theme.icons.itemsCircle} />
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
