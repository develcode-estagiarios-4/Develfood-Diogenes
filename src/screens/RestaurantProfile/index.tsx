/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {ActivityIndicator, StatusBar, View} from 'react-native';
import {useTheme} from 'styled-components';
import {BackButton} from '../../components/BackButton';
import {Plates} from '../../components/Plates';
import {useAuth} from '../../global/Context';
import {useFetch} from '../../global/services/get';

import {
  Container,
  Header,
  FavoriteIconWrapper,
  IconButton,
  FavoriteIcon,
  WrapperRestaurantInfo,
  WrapperRestaurantTypes,
  NameRestaurant,
  TypeFood,
  WrapperPhoto,
  RestaurantPhoto,
  Content,
  LineBetween,
  PlatesList,
  Wrapper,
  Title,
} from './styles';

{
  /* <ListPLateResponse> */
}

export function RestaurantProfile({route}: any) {
  const navigation = useNavigation();
  const {id, name, photo} = route.params;

  const {token} = useAuth();

  const theme = useTheme();

  const [isPressed, setIsPressed] = useState(false);

  function handlerBackButton() {
    navigation.navigate('Home' as never);
  }

  console.log(id, name);

  const {data, loading, fetchData} = useFetch<any>(
    `/foodType/restaurant/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return (
    <Container>
      <StatusBar
        barStyle={'dark-content'}
        translucent
        backgroundColor={theme.colors.background}
      />

      <Header>
        <BackButton onPressed={handlerBackButton} name="arrow" />

        <FavoriteIconWrapper>
          <IconButton onPress={() => setIsPressed(!isPressed)}>
            <FavoriteIcon
              source={theme.icons.favoriteRestaurant}
              style={
                isPressed ? {tintColor: theme.colors.background_red} : null
              }
            />
          </IconButton>
        </FavoriteIconWrapper>
      </Header>

      <WrapperRestaurantInfo>
        <WrapperRestaurantTypes>
          <NameRestaurant>{name}</NameRestaurant>
          <TypeFood>Lanche</TypeFood>
        </WrapperRestaurantTypes>

        <WrapperPhoto>
          <RestaurantPhoto source={theme.images.noImage} />
        </WrapperPhoto>
      </WrapperRestaurantInfo>

      <Content>
        <LineBetween />

        <PlatesList
          data={data}
          keyExtractor={(item: any) => item.id}
          ListHeaderComponent={
            <>
              <Wrapper>
                <Title>Pratos</Title>
              </Wrapper>
            </>
          }
          ListFooterComponent={() => (
            <View style={{height: 50, justifyContent: 'center'}}>
              {loading && (
                <ActivityIndicator color={theme.colors.background_red} />
              )}
            </View>
          )}
          renderItem={({item}: any) => (
            <Plates
              name={item.name}
              plateInfo={item.plateInfo}
              price={item.price}
              source={
                item.photo
                  ? {
                      uri: `${item.photo}`,
                    }
                  : theme.images.noImage
              }
            />
          )}
        />
      </Content>
    </Container>
  );
}
