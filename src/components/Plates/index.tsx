/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {useTheme} from 'styled-components';
import {useAuth} from '../../global/Context';
import {useCreateCart} from '../../global/Context/Cart';
import {useFetch} from '../../global/services/get';

import {
  Container,
  WrapperImage,
  PlateImage,
  WrapperPlateInfo,
  PlateTitle,
  PlateInfo,
  WrapperAdvancedInfo,
  Price,
  AddButton,
  TextButton,
  RemoveButton,
  WrapperCartButton,
  AddQuantityButton,
  AddQuantityButtonImage,
  RemoveCartButton,
  RemoveQuantityButtonImage,
  NumberOfQuantityWrapper,
  Number,
  LitterButton,
  LitterImage,
} from './styles';

interface ListPlatesProps {
  id: number;
  name: string;
  description: string;
  price: string;
  source: string;
  restaurantID: number;
}

interface Photos {
  id: number;
  code: string;
}

export function Plates({
  name,
  description,
  price,
  source,
  restaurantID,
  id,
}: ListPlatesProps) {
  const theme = useTheme();

  const {token} = useAuth();

  const {addProductToCart, removeProductFromCart, cart} = useCreateCart();

  const {data, fetchData} = useFetch<Photos>(source, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  function priceConverter() {
    const priceWZeros = parseFloat(price).toFixed(2);
    const priceFormatted = priceWZeros.toString().replace('.', ',');
    return priceFormatted;
  }
  const priceFormatted = priceConverter();

  useEffect(() => {
    fetchData();
  }, [source]);

  return (
    <Container>
      <WrapperImage>
        <PlateImage
          source={data.code ? {uri: `${data.code}`} : theme.images.noImage}
        />
      </WrapperImage>

      <WrapperPlateInfo>
        <PlateTitle>{name}</PlateTitle>
        <PlateInfo>{description}</PlateInfo>

        <WrapperAdvancedInfo>
          <Price>R$ {priceFormatted}</Price>
          {cart.find((item: any) => item?.id === id)?.quantity > 0 ? (
            <WrapperCartButton>
              <AddQuantityButton
                onPress={() => addProductToCart(id, price, restaurantID)}>
                <AddQuantityButtonImage source={theme.icons.add} />
              </AddQuantityButton>

              <NumberOfQuantityWrapper>
                <Number>
                  {cart.find((item: any) => item?.id === id)?.quantity}
                </Number>
              </NumberOfQuantityWrapper>

              {cart.find((item: any) => item?.id === id)?.quantity > 1 ? (
                <RemoveCartButton
                  onPress={() => removeProductFromCart(id, price)}>
                  <RemoveQuantityButtonImage source={theme.icons.remove} />
                </RemoveCartButton>
              ) : (
                <LitterButton onPress={() => removeProductFromCart(id, price)}>
                  <LitterImage source={theme.icons.litter} />
                </LitterButton>
              )}
            </WrapperCartButton>
          ) : (
            <AddButton
              onPress={() => addProductToCart(id, price, restaurantID)}>
              <TextButton>Adicionar</TextButton>
            </AddButton>
          )}
        </WrapperAdvancedInfo>
      </WrapperPlateInfo>
    </Container>
  );
}
