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

  const {addProductToCart, removeProductFromCart} = useCreateCart();

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
          <AddButton onPress={() => addProductToCart(id, price, restaurantID)}>
            <TextButton>Adicionar</TextButton>
          </AddButton>
          <RemoveButton onPress={() => removeProductFromCart(id, price)}>
            <TextButton>Remover</TextButton>
          </RemoveButton>
        </WrapperAdvancedInfo>
      </WrapperPlateInfo>
    </Container>
  );
}
