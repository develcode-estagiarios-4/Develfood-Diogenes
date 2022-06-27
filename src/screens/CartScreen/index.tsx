import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import {useTheme} from 'styled-components';
import {BackButton} from '../../components/BackButton';
import {Container, Header, MapImage} from './styles';

export function CartScreen() {
  const theme = useTheme();

  const navigation = useNavigation();

  function handlerBackHome() {
    navigation.navigate('Home' as never);
  }

  return (
    <Container>
      <StatusBar
        barStyle={'light-content'}
        translucent
        backgroundColor={theme.colors.background_red}
      />
      <Header>
        <BackButton name="exitWhite" onPressed={handlerBackHome} />
      </Header>
      <MapImage />
    </Container>
  );
}
