import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({theme}) => theme.colors.background};
  flex: 1;
  align-items: center;
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(97)}px;
  flex-direction: row;
  align-items: center;
`;

export const TittleWrapper = styled.View`
  width: ${RFValue(215)}px;
  align-items: center;
`;

export const Title = styled.Text`
  font-family: ${({theme}) => theme.fonts.primaryMed};
  font-size: ${RFValue(14)}px;
  font-weight: bold;
  color: ${({theme}) => theme.colors.text_dark};
`;

export const Text = styled.Text`
  font-family: ${({theme}) => theme.fonts.primaryMed};
  font-size: ${RFValue(12)}px;
  font-weight: bold;
  color: ${({theme}) => theme.colors.text_gray};
  margin-top: ${RFValue(5)}px;
`;

export const WrapperText = styled.View`
  width: 100%;
`;

export const WrapperTitle = styled.View`
  width: 100%;
`;

export const SubTitle = styled.Text`
  font-family: ${({theme}) => theme.fonts.primaryMed};
  font-size: ${RFValue(28)}px;
  font-weight: bold;
  color: ${({theme}) => theme.colors.text_dark};
`;

export const Content = styled.View`
  margin-top: ${RFValue(35)}px;
  width: 100%;
  padding: 0 ${RFValue(50)}px;
  margin-bottom: ${RFValue(70)}px;
`;

export const WomanImage = styled.Image`
  margin-top: ${RFValue(10)}px;
`;
