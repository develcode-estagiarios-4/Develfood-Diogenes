import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(100)}px;
  position: absolute;
  background-color: ${({theme}) => theme.colors.header};
`;

export const BannerWrapper = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {paddingLeft: 12},
})`
  flex: 1;
  position: absolute;
  top: ${RFValue(112)}px;
`;

export const Banner = styled.Image`
  margin-right: ${RFValue(8)}px;
`;

export const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin: 0 ${RFValue(21)}px;
  margin-top: ${RFValue(320)}px;
`;

export const List = styled.FlatList`
  font-family: ${({theme}) => theme.fonts.secondaryMed};
`;

export const TitleWrapper = styled.View`
  position: absolute;
  margin-top: ${RFValue(256)}px;
  margin-left: ${RFValue(14)}px;
`;

export const Title = styled.Text`
  font-family: ${({theme}) => theme.fonts.secondaryBold};
  font-size: ${RFValue(14)}px;
  font-weight: bold;
`;

export const CategorySelect = styled.ScrollView`
  flex-direction: row;
  position: absolute;
  margin-top: ${RFValue(285)}px;
`;

export const RestaurantListWrapper = styled.View``;

export const RestaurantList = styled.FlatList`
  flex: 1;
`;
