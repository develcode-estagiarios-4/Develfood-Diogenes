import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';

export const Container = styled.View`
  width: 100%;
  height: ${RFValue(50)}px;
  align-self: center;
  align-items: center;
  flex-direction: row;
  margin-top: ${RFValue(13)}px;
  border: ${RFValue(2)}px;
  border-radius: ${RFValue(10)}px;
  border-color: ${({theme}) => theme.colors.text_gray};
`;

export const LoginIcon = styled.Image`
  margin-left: ${RFValue(18)}px;
`;

export const InputLogin = styled.TextInput`
  margin-left: ${RFValue(14)}px;
  width: ${RFValue(200)}px;
`;

export const IconPassword = styled.TouchableOpacity`
  position: absolute;
  right: 18;
`;

export const Error = styled.Text`
  align-self: center;
  margin-top: 8px;
  font-family: ${({theme}) => theme.fonts.secondaryBold};
  font-size: 15px;
  color: ${({theme}) => theme.colors.background_red};
`;

export const LogoHide = styled.Image``;
