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
  WrapperCartButton,
  AddQuantityButton,
  AddQuantityButtonImage,
  RemoveCartButton,
  RemoveQuantityButtonImage,
  NumberOfQuantityWrapper,
  Number,
  LitterButton,
  LitterImage,
  PriceWrapper,
} from './styles';

interface ListPlatesProps {
  id: number;
  name: string;
  description: string;
  price: string;
  source: string;
  restaurantID: number;
  restaurantName: string;
  restaurantPhoto: string;
  restaurantFoodTypes: string;
}

interface Photos {
  id: number;
  code: string;
}

interface ItemProps {
  id: string;
  quantity: number;
  price: number;
}

export function Plates({
  name,
  description,
  price,
  source,
  restaurantID,
  restaurantName,
  restaurantPhoto,
  restaurantFoodTypes,
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
          <PriceWrapper>
            <Price>R$ {priceFormatted}</Price>
          </PriceWrapper>
          {cart.find((item: ItemProps) => item?.id === id)?.quantity > 0 ? (
            <WrapperCartButton>
              <AddQuantityButton
                onPress={() =>
                  addProductToCart(
                    id,
                    price,
                    restaurantID,
                    restaurantName,
                    restaurantPhoto,
                    restaurantFoodTypes,
                  )
                }>
                <AddQuantityButtonImage source={theme.icons.add} />
              </AddQuantityButton>

              <NumberOfQuantityWrapper>
                <Number>
                  {cart.find((item: any) => item?.id === id)?.quantity}
                </Number>
              </NumberOfQuantityWrapper>

              {cart.find((item: ItemProps) => item?.id === id)?.quantity > 1 ? (
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
