import {RFValue} from 'react-native-responsive-fontsize';
import styled, {css} from 'styled-components/native';

interface DateValueProps {
  selected: boolean;
}

export const Container = styled.View`
  position: absolute;
  width: 100%;
  height: ${RFValue(60)}px;

  background-color: ${({theme}) => theme.colors.background_red};

  /* bottom: 0;
  padding: 10px;
  border-top: 2; */

  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  bottom: 0;
`;

export const Wrapper = styled.TouchableOpacity<DateValueProps>`
  ${({selected}) =>
    !selected &&
    css`
      width: ${RFValue(20)}px;
    `}
`;
