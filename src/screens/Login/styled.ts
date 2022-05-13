import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
  justify-content: center;
  align-items: center;
`;

export const Hamburger = styled.Image`
  position: absolute;
  left: 0;
  top: 0;
`;

export const HalfPizza = styled.Image`
  position: absolute;
  right: 0;
  top: 0;
`;

export const Content = styled.View`
  flex: 1;
  width: 100%;
  height: ${RFValue(280)}px;
  margin-top: ${RFValue(190)}px;
  background-color: transparent;
  z-index: 1;
`;

export const LogoImage = styled.Image`
  align-self: center;
`;

export const FogotPassButton = styled.TouchableOpacity`
  margin-top: ${RFValue(12)}px;
  margin-left: ${RFValue(221)}px;
  bottom: 0;
`;

export const ForgotPass = styled.Text`
  font-family: ${({theme}) => theme.fonts.secondaryBold};
  font-weight: bold;
`;

export const LoginButton = styled.TouchableOpacity`
  width: ${RFValue(295)}px;
  height: ${RFValue(50)}px;
  align-items: center;
  justify-content: center;
  margin-left: ${RFValue(40)}px;
  margin-top: ${RFValue(22)}px;
  border-radius: ${RFValue(10)}px;
  background-color: ${({theme}) => theme.colors.background_red};
`;

export const ButtonTitleLogin = styled.Text`
  font-family: ${({theme}) => theme.fonts.primaryReg};
  color: ${({theme}) => theme.colors.text_white};
  font-size: ${RFValue(14)}px;
`;

export const WrapperRegister = styled.View`
  margin-top: ${RFValue(19)}px;
  flex-direction: row;
  justify-content: center;
`;

export const RegisterSimpleTitle = styled.Text`
  font-family: ${({theme}) => theme.fonts.secondaryBold};
  font-size: ${RFValue(12)}px;
  font-weight: bold;
  color: ${({theme}) => theme.colors.text_login};
`;

export const RegisterButtonTitle = styled.TouchableOpacity``;

export const ButtonTitle = styled.Text`
  font-family: ${({theme}) => theme.fonts.secondaryBold};
  font-weight: bold;
  font-size: ${RFValue(12)}px;
  color: ${({theme}) => theme.colors.background_red};
`;

export const FooterImage = styled.Image`
  position: absolute;
  bottom: 0;
`;
