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
  source: any;
}

interface Photos {
  id: number;
  code: string;
}

export function Plates({name, description, price, source}: ListPlatesProps) {
  const theme = useTheme();

  const {token} = useAuth();

  const photo = source.slice(33);

  const {data, fetchData} = useFetch<Photos>(photo, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  async function loadPhotoPLates() {
    await fetchData();
  }

  useEffect(() => {
    loadPhotoPLates();
  }, [photo]);

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
          <Price>R${price.toString().replace('.', ',')}</Price>
          <AddButton>
            <TextButton>Adicionar</TextButton>
          </AddButton>
        </WrapperAdvancedInfo>
      </WrapperPlateInfo>
    </Container>
  );
}
