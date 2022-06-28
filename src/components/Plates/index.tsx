/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
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
  restaurantFoodTypes: string;
  restaurantName: string;
  inside: boolean;
  photoRestaurant: string;
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
  id,
  restaurantFoodTypes,
  restaurantName,
  photoRestaurant,
  inside,
}: ListPlatesProps) {
  const theme = useTheme();

  const {token} = useAuth();

  const {addProductToCart, removeProductFromCart, cart, addNewProductoCart} =
    useCreateCart();

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

          {cart.find((item?: ItemProps) => item?.id === id)?.quantity > 0 ? (
            <WrapperCartButton insideCart={inside ? RFValue(5) : RFValue(20)}>
              <AddQuantityButton
                onPress={() => addProductToCart(id, price, restaurantID)}>
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
              onPress={() =>
                addNewProductoCart(
                  id,
                  price,
                  restaurantID,
                  name,
                  description,
                  source,
                  restaurantFoodTypes,
                  restaurantName,
                  photoRestaurant,
                )
              }>
              <TextButton>Adicionar</TextButton>
            </AddButton>
          )}
        </WrapperAdvancedInfo>
      </WrapperPlateInfo>
    </Container>
  );
}
