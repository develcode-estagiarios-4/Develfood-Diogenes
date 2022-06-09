import React from 'react';

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
  plateInfo: string;
  price: string;
  source: any;
}

export function Plates({name, plateInfo, price, source}: ListPlatesProps) {
  return (
    <Container>
      <WrapperImage>
        <PlateImage source={source} />
      </WrapperImage>

      <WrapperPlateInfo>
        <PlateTitle>{name}</PlateTitle>
        <PlateInfo>{plateInfo}</PlateInfo>

        <WrapperAdvancedInfo>
          <Price>{price}</Price>
          <AddButton>
            <TextButton>Adicionar</TextButton>
          </AddButton>
        </WrapperAdvancedInfo>
      </WrapperPlateInfo>
    </Container>
  );
}
