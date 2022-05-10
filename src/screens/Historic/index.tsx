import React from 'react';
import {StatusBar} from 'react-native';
import {Container, Header} from './styles';

export function Historic() {
  return (
    <Container>
      <StatusBar
        barStyle={'light-content'}
        translucent
        backgroundColor="transparent"
      />
      <Header />
    </Container>
  );
}
