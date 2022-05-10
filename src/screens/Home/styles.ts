import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;

  margin-bottom: 70px;

  background-color: ${({theme}) => theme.colors.background};
`;

export const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;

  margin-top: 130px;
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(148)}px;

  flex: 1;

  position: absolute;

  background-color: ${({theme}) => theme.colors.header};
`;

export const List = styled.FlatList`
  font-family: ${({theme}) => theme.fonts.secondaryMed};
`;
