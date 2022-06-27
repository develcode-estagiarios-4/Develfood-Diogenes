import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View``;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(100)}px;
  background-color: ${({theme}) => theme.colors.header};
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text``;

export const MapImage = styled.Image``;
