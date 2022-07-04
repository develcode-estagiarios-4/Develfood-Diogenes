/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {useTheme} from 'styled-components';
import {BackButton} from '../../components/BackButton';
import {CheckoutComponent} from '../../components/CheckoutComponent';
import {ListEmptyComponent} from '../../components/ListEmptyComponent';
import {Plates} from '../../components/Plates';
import {useAuth} from '../../global/Context';
import {useCreateCart} from '../../global/Context/Cart';
import {useFetch} from '../../global/services/get';

import {
  Container,
  Header,
  Title,
  WrapperInfo,
  MapImage,
  WrapperAddresInfo,
  SubTitle,
  Street,
  Neighborhood,
  Content,
  LineBetween,
  WrapperInfoRestaurant,
  RestauratName,
  FoodType,
  WrapperPhoto,
  RestaurantPhoto,
  WrapperPlates,
  TitleCart,
  CartList,
  WrapperCartPlates,
  FooterComponent,
} from './styles';

interface PlateProps {
  name: string;
  description: string;
  source: any;
  price: string;
  id: number;
  restaurantID: number;
  restaurantFoodTypes: string;
  restaurantName: string;
  unityPrice: string;
}

interface Photos {
  id: number;
  code: string;
  restaurantPhoto: string;
}

export function Checkout({
  source,
  restaurantName,
  restaurantFoodTypes,
}: PlateProps) {
  const theme = useTheme();

  const {token} = useAuth();

  const navigation = useNavigation();

  const {cart, nameRestaurant, foodTypes, restaurantPhoto} = useCreateCart();

  function handlerBackHome() {
    navigation.navigate('Home' as never);
  }

  const {fetchData} = useFetch<Photos>(source, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const {data, fetchData: fetchPhoto} = useFetch<Photos>(restaurantPhoto, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    fetchData();
    fetchPhoto();
  }, [source, cart]);

  return (
    <Container>
      <StatusBar
        barStyle={'light-content'}
        translucent
        backgroundColor={theme.colors.background_red}
      />
      <Header>
        <BackButton name="exitWhite" onPressed={handlerBackHome} />
        <Title>Compras</Title>
      </Header>

      {cart.length > 0 ? (
        <>
          <WrapperInfo>
            <MapImage source={theme.images.mapImage} />

            <WrapperAddresInfo>
              <SubTitle>Entregar em:</SubTitle>
              <Street>Garusogil 43</Street>
              <Neighborhood>Gangnam - Garusogil 43</Neighborhood>
            </WrapperAddresInfo>
          </WrapperInfo>
          <Content>
            <LineBetween />

            <WrapperInfoRestaurant>
              <RestauratName>{nameRestaurant}</RestauratName>

              <FoodType>
                {foodTypes?.charAt(0).toUpperCase() +
                  foodTypes?.slice(1).toLowerCase()}
              </FoodType>

              <WrapperPhoto>
                <RestaurantPhoto
                  source={
                    data.code
                      ? {
                          uri: `${data.code}`,
                        }
                      : theme.images.noImage
                  }
                />
              </WrapperPhoto>
            </WrapperInfoRestaurant>
          </Content>
          <WrapperPlates>
            <TitleCart>Meus Pedidos</TitleCart>
          </WrapperPlates>
          <CartList
            data={cart}
            renderItem={({item}: any) => (
              <WrapperCartPlates>
                <Plates
                  Swipe
                  inside
                  name={item.name}
                  description={item.description}
                  source={item.source ? item.source : theme.images.noImage}
                  price={item.unityPrice}
                  id={item.id}
                  restaurantID={item.restaurantID}
                  restaurantFoodTypes={restaurantFoodTypes}
                  restaurantName={restaurantName}
                  photoRestaurant={restaurantPhoto}
                />
              </WrapperCartPlates>
            )}
            ListFooterComponent={() => <FooterComponent />}
          />
        </>
      ) : (
        <ListEmptyComponent
          source={theme.images.checkoutEmpty}
          title="Seu carrinho está vazio"
        />
      )}
      <CheckoutComponent />
    </Container>
  );
}
