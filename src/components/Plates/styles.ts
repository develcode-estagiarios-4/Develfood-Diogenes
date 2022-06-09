import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: ${RFValue(103)}px;

  flex-direction: row;
  align-items: center;
  margin-bottom: ${RFValue(18)}px;
  border-radius: ${RFValue(8)}px;
`;

export const WrapperImage = styled.View`
  left: ${RFValue(5)}px;
  margin: ${RFValue(5)}px;
`;

export const PlateImage = styled.Image`
  width: ${RFValue(80)}px;
  height: ${RFValue(80)}px;
  border-radius: ${RFValue(8)}px;
`;

export const WrapperPlateInfo = styled.View`
  position: absolute;
  top: ${RFValue(10)}px;
  left: ${RFValue(95)}px;
  right: ${RFValue(20)}px;
`;

export const PlateTitle = styled.Text`
  text-align: justify;
  font-weight: 500;
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.icon_red};
`;

export const PlateInfo = styled.Text`
  font-size: ${RFValue(10)}px;
  font-weight: 400;
  color: ${({theme}) => theme.colors.text_gray};
`;

export const WrapperAdvancedInfo = styled.View`
  margin-top: ${RFValue(7)}px;
  flex-direction: row;
  justify-content: space-between;
`;

export const Price = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: 700;
  color: ${({theme}) => theme.colors.text_dark};
`;

export const AddButton = styled.TouchableOpacity``;

export const TextButton = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: 500;
  color: ${({theme}) => theme.colors.icon_red};
`;
