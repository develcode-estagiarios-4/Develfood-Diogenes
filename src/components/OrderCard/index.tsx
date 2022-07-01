/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {Text} from 'react-native';
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
} from './styles';

interface OrderProps {
  photo_url: any;
  restaurantName: string;
  statusOrder: any;
  orderNumber: number;
  foodName: string;
  foodDescription: string;
  orderDate: any;
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
  foodDescription,
  orderDate,
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
        <StatusOrder>{statusOrder}</StatusOrder>
        <OrderN>N° </OrderN>
        <OrderNumber>{orderNumber}</OrderNumber>
        <FoodOrderName>
          {foodName}: {foodDescription}
        </FoodOrderName>
        <Text>{orderDate}</Text>
      </WrapperRestaurantInfo>
    </Container>
  );
}
