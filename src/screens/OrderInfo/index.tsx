/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {RouteProp, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, StatusBar} from 'react-native';
import {useTheme} from 'styled-components';
import {BackButton} from '../../components/BackButton';
import {CardOrderInfo} from '../../components/CardOrderInfo';
import {useAuth} from '../../global/Context';
import {useFetch} from '../../global/services/get';
import {
  Container,
  Header,
  MapImage,
  Neighborhood,
  RestaurantPhoto,
  Street,
  SubTitle,
  Title,
  WrapperAddresInfo,
  WrapperInfo,
  WrapperRestaurantInfo,
  Restaurant,
  RestaurantName,
  WrapperName,
  WrapperCartPlates,
  WrapperPlates,
  LineBetween,
} from './styles';

interface RouteParams {
  route: RouteProp<
    {
      params: {
        name: string;
        photo_url: string;
        id: number;
      };
    },
    'params'
  >;
}

interface PlateProps {
  name: string;
  description: string;
  source: string;
  price: number;
  id: number;
  restaurantID: number;
  restaurantFoodTypes: string;
  restaurantName: string;
  unityPrice: number;
}

interface Photo {
  id: number;
  code: string;
}

export function OrderInfo({route}: RouteParams, {source}: PlateProps) {
  const theme = useTheme();

  const {token} = useAuth();

  const {name, photo_url, id} = route.params;

  const [order, setOrder] = useState<any[]>([]);

  const navigation = useNavigation();

  function handlerBackHome() {
    navigation.navigate('Home' as never);
  }

  const {fetchData} = useFetch<any[]>(`/request/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  function onSuccess(response: any) {
    setOrder([...order, ...response.content]);
  }

  async function loadOrder() {
    await fetchData(onSuccess);
  }

  const {fetchData: fetchPhotoFood} = useFetch<Photo>(source, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const {data, fetchData: fetchPhoto} = useFetch<Photo>(photo_url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const renderItem = ({item}: {item: PlateProps}) => {
    return (
      <WrapperCartPlates>
        <CardOrderInfo
          name={item.name}
          description={item.description}
          price={item.unityPrice}
          source={item.source ? item.source : theme.images.noImage}
          orderID={id}
        />
      </WrapperCartPlates>
    );
  };

  useEffect(() => {
    fetchPhoto();
    fetchPhotoFood();
    loadOrder();
  }, []);

  return (
    <Container>
      <StatusBar
        barStyle={'light-content'}
        translucent={false}
        backgroundColor={theme.colors.background_red}
      />
      <Header>
        <BackButton name="exitWhite" onPressed={handlerBackHome} />
        <Title>Pedido N°</Title>
      </Header>

      <WrapperInfo>
        <MapImage source={theme.images.mapImage} />

        <WrapperAddresInfo>
          <SubTitle>Entregar em:</SubTitle>
          <Street>Garusogil 43</Street>
          <Neighborhood>Gangnam - Garusogil 43 {id}</Neighborhood>
        </WrapperAddresInfo>
      </WrapperInfo>

      <WrapperRestaurantInfo>
        <RestaurantPhoto
          source={
            data.code
              ? {
                  uri: `${data.code}`,
                }
              : theme.images.noImage
          }
        />
        <WrapperName>
          <Restaurant>Restaurante</Restaurant>
          <RestaurantName>{name}</RestaurantName>
        </WrapperName>
      </WrapperRestaurantInfo>

      <LineBetween />

      <WrapperPlates />

      <FlatList
        data={order}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        style={{
          width: '90%',
          marginRight: '10%',
        }}
      />
    </Container>
  );
}
