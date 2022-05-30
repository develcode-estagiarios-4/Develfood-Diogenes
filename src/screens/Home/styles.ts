import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;

  margin-bottom: 70px;

  background-color: ${({theme}) => theme.colors.background};
`;

export const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin: 0 ${RFValue(20)}px;
  margin-top: ${RFValue(332)}px;
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(100)}px;
  flex: 1;
  position: absolute;
  background-color: ${({theme}) => theme.colors.header};
`;

export const List = styled.FlatList`
  font-family: ${({theme}) => theme.fonts.secondaryMed};
`;

export const BannerWrapper = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {paddingLeft: 24},
})`
  width: 100%;
  position: absolute;
  margin-top: ${RFValue(112)}px;
`;

export const Banner = styled.Image`
  margin-right: ${RFValue(8)}px;
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

export const RestaurantList = styled.FlatList``;
