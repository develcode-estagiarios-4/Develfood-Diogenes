import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({theme}) => theme.colors.background};
  flex: 1;
  align-items: center;
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(60)}px;

  flex-direction: row;

  align-items: center;
`;

export const TittleWrapper = styled.View`
  width: ${RFValue(215)}px;

  align-items: center;
`;

export const Title = styled.Text`
  font-family: ${({theme}) => theme.fonts.primaryMed};
  font-size: ${RFValue(17)}px;
  font-weight: bold;
  color: ${({theme}) => theme.colors.text_dark};
`;

export const CircleWrapper = styled.View`
  width: 100%;
  height: ${RFValue(50)}px;

  flex-direction: row;
`;

export const CircleAdjust = styled.View`
  width: ${RFValue(50)}px;
  height: ${RFValue(50)}px;

  align-items: center;
  justify-content: center;

  margin-left: ${RFValue(54)}px;
`;

export const Circle = styled.Image``;

export const CenterCircle = styled.Image`
  position: absolute;
`;
