import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
`;

export const ButtonIcon = styled.View`
  width: ${RFValue(75)}px;
  height: ${RFValue(60)}px;

  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  width: ${RFValue(75)}px;
  font-size: ${RFValue(11)}px;
  text-align: center;
  color: white;
`;
