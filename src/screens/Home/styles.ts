import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`;

export const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(148)}px;

  background-color: ${({theme}) => theme.colors.header};
`;

export const List = styled.FlatList`
  font-family: ${({theme}) => theme.fonts.secondaryMed};
`;
