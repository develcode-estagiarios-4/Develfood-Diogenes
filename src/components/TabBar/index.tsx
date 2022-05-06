/* eslint-disable no-lone-blocks */
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import theme from '../../global/styles/theme';
import {TabBarButton} from '../TabBarButton';

import {Container, Wrapper} from './styles';

export function TabBar() {
  const navigation = useNavigation();
  return (
    <Container>
      <Wrapper
        selected={false}
        onPress={() => {
          navigation.navigate('Inicio' as never);
        }}>
        <TabBarButton name={theme.nameIcons.home} icon={'home'} />
      </Wrapper>

      <Wrapper
        selected={false}
        onPress={() => {
          navigation.navigate('Favoritos' as never);
        }}>
        <TabBarButton name={theme.nameIcons.favorite} icon={'favorite'} />
      </Wrapper>

      <Wrapper
        selected={false}
        onPress={() => {
          navigation.navigate('Historico' as never);
        }}>
        <TabBarButton name={theme.nameIcons.list} icon={'list'} />
      </Wrapper>

      <Wrapper
        selected={false}
        onPress={() => {
          navigation.navigate('Perfil' as never);
        }}>
        <TabBarButton name={theme.nameIcons.user} icon={'user'} />
      </Wrapper>
    </Container>
  );
}

{
  /* <TabBarButton icon="home" onPress={() => {}} name={'Home'} />
      <TabBarButton icon="star" onPress={() => {}} name={'star'} />
      <TabBarButton icon="phone" onPress={() => {}} name={'phone'} />
      <TabBarButton icon="user" onPress={() => {}} name={'user'} /> */
}
