import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(56)}px;
  background-color: ${({theme}) => theme.colors.header};
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: 500;
  color: ${({theme}) => theme.colors.text_white};
  left: ${RFValue(110)}px;
`;

export const WrapperInfo = styled.View`
  width: 100%;
  padding: ${RFValue(16)}px ${RFValue(16)}px;
  flex-direction: row;
`;

export const MapImage = styled.Image`
  width: ${RFValue(54)}px;
  height: ${RFValue(54)}px;
`;

export const WrapperAddresInfo = styled.View`
  left: ${RFValue(10)}px;
`;

export const SubTitle = styled.Text`
  font-size: ${RFValue(10)}px;
  font-weight: 400;
  color: ${({theme}) => theme.colors.text_gray};
`;

export const Street = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: 400;
  color: ${({theme}) => theme.colors.text_dark};
`;

export const Neighborhood = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: 400;
  color: ${({theme}) => theme.colors.text_dark};
`;

export const WrapperRestaurantInfo = styled.View`
  left: ${RFValue(16)}px;
  flex-direction: row;
`;

export const RestaurantPhoto = styled.Image`
  width: ${RFValue(60)}px;
  height: ${RFValue(60)}px;
  border-radius: ${RFValue(50)}px;
`;

export const WrapperName = styled.View`
  left: ${RFValue(5)}px;
  justify-content: center;
`;

export const Restaurant = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: 400;
  color: ${({theme}) => theme.colors.text_gray};
`;

export const RestaurantName = styled.Text`
  font-size: ${RFValue(18)}px;
  font-weight: 400;
  color: ${({theme}) => theme.colors.text_dark};
`;

export const WrapperPlates = styled.View`
  width: 90%;
  height: 100%;
  top: ${RFValue(250)}px;
  margin-right: ${RFValue(30)}px;
  padding-top: ${RFValue(27)}px;
  border-top-right-radius: ${RFValue(60)}px;
  position: absolute;
  align-items: center;
  background-color: ${({theme}) => theme.colors.card};
`;

export const WrapperCartPlates = styled.View`
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
  background-color: blue;
`;

export const LineBetween = styled.View`
  width: ${RFValue(321)}px;
  height: ${RFValue(2)}px;
  top: ${RFValue(12)}px;
  background-color: #f0f0f5;
  margin-left: ${RFValue(20)}px;
`;
