/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
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
  description: string;
  price: string;
  source: any;
}

interface Photos {
  id: number;
  code: string;
}

export function Plates({description, price, source}: ListPlatesProps) {
  const theme = useTheme();

  const {token} = useAuth();

  const [photos, setPhotos] = useState<Photos[]>([]);

  const {data, fetchData} = useFetch<Photos>(`/photo/${source}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  function onSuccess(response: any) {
    setPhotos([...photos, ...response]);
  }

  useEffect(() => {
    fetchData(onSuccess);
  }, []);

  return (
    <Container>
      <WrapperImage>
        <PlateImage
          source={data.code ? {uri: `${data.code}`} : theme.images.noImage}
        />
      </WrapperImage>

      <WrapperPlateInfo>
        <PlateTitle>{description}</PlateTitle>
        <PlateInfo>
          Um prato de camarão com fritas que é uma ótima opção para pedir quando
          se está com a família
        </PlateInfo>

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
