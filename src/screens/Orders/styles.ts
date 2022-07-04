import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(100)}px;
  background-color: ${({theme}) => theme.colors.header};
  align-items: center;
  padding-top: ${RFValue(30)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: 500;
  color: ${({theme}) => theme.colors.text_white};
  top: ${RFValue(20)}px;
`;

export const WrapperInfo = styled.View`
  width: 100%;
  padding-top: ${RFValue(20)}px;
  padding-left: ${RFValue(20)}px;
`;

export const SubTitle = styled.Text`
  font-size: ${RFValue(18)}px;
  font-weight: 400;
  color: ${({theme}) => theme.colors.text_dark};
`;

export const OrderDate = styled.Text`
  font-size: ${RFValue(10)}px;
  font-weight: 400;
  color: ${({theme}) => theme.colors.text_gray};
  left: ${RFValue(20)}px;
`;

export const Content = styled.View`
  padding: 0 ${RFValue(20)}px;
`;

export const Footer = styled.View`
  width: 100%;
  height: ${RFValue(100)}px;
  align-items: center;
  top: ${RFValue(20)}px;
`;
