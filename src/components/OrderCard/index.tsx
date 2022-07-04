/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {useTheme} from 'styled-components';
import {useAuth} from '../../global/Context';
import {useFetch} from '../../global/services/get';
import {
  CheckOrders,
  Container,
  FoodOrderName,
  OrderN,
  OrderNumber,
  RestaurantName,
  RestaurantPhoto,
  StatusOrder,
  WrapperRestaurantInfo,
  WrapperInfoPoduct,
} from './styles';

interface OrderProps {
  photo_url: string;
  restaurantName: string;
  statusOrder: string;
  orderNumber: number;
  foodName: string;
}

interface Photo {
  id: number;
  code: string;
}

export function OrderCard({
  photo_url,
  restaurantName,
  statusOrder,
  orderNumber,
  foodName,
}: OrderProps) {
  const {token} = useAuth();

  const theme = useTheme();

  const {data, fetchData} = useFetch<Photo>(photo_url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    fetchData();
  }, [photo_url]);
  return (
    <Container>
      <RestaurantPhoto
        source={
          data.code
            ? {
                uri: `${data.code}`,
              }
            : theme.images.noImage
        }
      />
      <WrapperRestaurantInfo>
        <RestaurantName>{restaurantName}</RestaurantName>
        <CheckOrders source={theme.icons.checkOrders} />
        <WrapperInfoPoduct>
          <StatusOrder>{statusOrder}</StatusOrder>
          <OrderN>N° </OrderN>
          <OrderNumber>{orderNumber}</OrderNumber>
        </WrapperInfoPoduct>
        <FoodOrderName>{foodName}</FoodOrderName>
      </WrapperRestaurantInfo>
    </Container>
  );
}
