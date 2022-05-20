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

export const InputWrapper = styled.ScrollView`
  width: ${RFValue(300)}px;
  margin: 0 ${RFValue(40)}px;
`;

export const Wrapper = styled.View`
  flex-direction: row;
`;

export const HalfInput = styled.View`
  margin-right: 20px;
  width: ${RFValue(160)}px;
`;

export const HalfInputTwo = styled.View`
  margin-right: 20px;
  width: ${RFValue(121)}px;
`;
export const WrapperTwo = styled.View`
  flex-direction: row;
`;
export const HalfInputThree = styled.View`
  margin-right: 20px;
  width: ${RFValue(140.5)}px;
`;
export const HalfInputFour = styled.View`
  margin-right: 20px;
  width: ${RFValue(140.5)}px;
`;
