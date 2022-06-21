import React from 'react';
import {Image, ImageSourcePropType} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useTheme} from 'styled-components';

import {ButtonIcon, Title} from './styles';
interface Props {
  source: ImageSourcePropType;
  name: string;
  isPressed: boolean;
  onPressed: Function;
}

export function TabBarButton({source, name, isPressed, onPressed}: Props) {
  const theme = useTheme();
  return (
    <ButtonIcon onPress={() => onPressed()}>
      <Image
        source={source}
        style={{
          tintColor: isPressed ? theme.colors.icon_red : theme.colors.icon_gray,
          height: isPressed ? RFValue(25) : RFValue(20),
          width: isPressed ? RFValue(36) : RFValue(32),
        }}
      />
      {isPressed ? <Title /> : <Title>{name}</Title>}
    </ButtonIcon>
  );
}
