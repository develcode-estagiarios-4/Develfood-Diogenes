/* eslint-disable no-lone-blocks */
import React from 'react';
import {Image} from 'react-native';
import {useTheme} from 'styled-components';

import {Container, ButtonIcon, Title} from './styles';

interface Props {
  name: string;
  icon: string;
}

export function TabBarButton({name, icon}: Props) {
  const theme = useTheme();
  return (
    <Container>
      <ButtonIcon>
        <Image
          source={
            icon === 'home'
              ? theme.icons.home
              : icon === 'favorite'
              ? theme.icons.favorite
              : icon === 'list'
              ? theme.icons.list
              : icon === 'user'
              ? theme.icons.user
              : null
          }
          style={{
            tintColor: theme.colors.icon_white,
          }}
        />
        <Title>{name}</Title>
      </ButtonIcon>
    </Container>
  );
}

{
  /* <IconButton
        onPress={() => {
          setIconPressed(name);
          return onPress;
        }}>
        <TabButton
          name={icon}
          color={
            iconPressed === name
              ? theme.colors.icon_red
              : theme.colors.icon_gray
          }
          style={{width: 100, height: 100}}
        />
      </IconButton>
      <Title>{name}</Title> */
}
