import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {TextInputMask} from 'react-native-masked-text';

export const Container = styled.View`
  width: ${RFValue(295)}px;
  height: ${RFValue(50)}px;
  align-self: center;
  align-items: center;
  flex-direction: row;
  margin-top: ${RFValue(12)}px;
  border: 1px;
  border-radius: 10px;
  border-color: ${({theme}) => theme.colors.text_gray};
  background-color: transparent;
  font-size: ${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.primaryReg};
`;

export const LoginIcon = styled.Image`
  margin-left: ${RFValue(18)}px;
`;

export const TextMask = styled(TextInputMask)`
  margin-left: ${RFValue(14)}px;
  width: ${RFValue(250)}px;
`;

export const Error = styled.Text`
  align-self: center;
  margin-top: 8px;
  font-family: ${({theme}) => theme.fonts.secondaryBold};
  font-size: 15px;
  color: ${({theme}) => theme.colors.background_red};
`;
