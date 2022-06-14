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
  description: string;
  price: string;
  source: any;
}

export function Plates({description, price, source}: ListPlatesProps) {
  return (
    <Container>
      <WrapperImage>
        <PlateImage source={source} />
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
