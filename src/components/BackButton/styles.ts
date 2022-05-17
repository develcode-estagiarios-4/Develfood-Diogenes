import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const ButtonIcon = styled.TouchableOpacity`
  background-color: white;

  width: ${RFValue(50)}px;

  align-items: center;

  margin-left: ${RFValue(23)}px;
`;

export const ArrowIcon = styled.Image`
  width: ${RFValue(30)}px;
  height: ${RFValue(30)}px;
`;
