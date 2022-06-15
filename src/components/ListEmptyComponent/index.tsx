import React from 'react';
import {Image} from 'react-native';
import {useTheme} from 'styled-components';
import {Container, Title} from './styles';

interface ListEmptyComponentProps {
  title: string;
}

export function ListEmptyComponent({title}: ListEmptyComponentProps) {
  const theme = useTheme();

  return (
    <Container>
      <Image source={theme.images.notFound} />
      <Title>{title}</Title>
    </Container>
  );
}
