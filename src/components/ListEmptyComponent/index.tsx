import React from 'react';
import {Image} from 'react-native';
import {useTheme} from 'styled-components';
import {Container, Title} from './styles';

export function ListEmptyComponent() {
  const theme = useTheme();

  return (
    <Container>
      <Image source={theme.images.notFound} />
      <Title>Nenhum prato encontrado</Title>
    </Container>
  );
}
