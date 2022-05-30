import React from 'react';
import {useTheme} from 'styled-components';
import {
  Container,
  RestaurantImage,
  Content,
  Title,
  Description,
  SubTitle,
  Avaliation,
} from './styled';

interface ListRestaurantProps {
  name: string;
}

export function Restaurants({name}: ListRestaurantProps) {
  const theme = useTheme();
  return (
    <Container>
      <RestaurantImage source={theme.images.pizzaImage} />

      <Content>
        <Title>{name}</Title>

        <Description>
          <SubTitle>Pizza</SubTitle>

          <Avaliation>5</Avaliation>
        </Description>
      </Content>
    </Container>
  );
}
