/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {useTheme} from 'styled-components';
import {useAuth} from '../../global/Context';
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
} from './styles';

interface ListPlatesProps {
  name: string;
  description: string;
  price: string;
  source: string;
  onPress: () => void;
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
  onPress,
}: ListPlatesProps) {
  const theme = useTheme();

  const {token} = useAuth();

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
          <AddButton onPress={onPress}>
            <TextButton>Adicionar</TextButton>
          </AddButton>
        </WrapperAdvancedInfo>
      </WrapperPlateInfo>
    </Container>
  );
}
