/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */

import {useFocusEffect} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useCallback} from 'react';
import {ActivityIndicator, SectionList, StatusBar, View} from 'react-native';
import {useTheme} from 'styled-components';
import {ListEmptyComponent} from '../../components/ListEmptyComponent';
import {OrderCard} from '../../components/OrderCard';
import {useAuth} from '../../global/Context';
import {useFetch} from '../../global/services/get';
import moment from 'moment';
import {
  Container,
  Content,
  Header,
  OrderDate,
  SubTitle,
  Title,
  WrapperInfo,
} from './styles';

interface PlateDTOResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  foodType: ListFoodType;
  restaurantName: string;
  photo_url: string;
}

interface RequestItemsResponse {
  id: number;
  plateDTO: PlateDTOResponse;
  quantity: number;
  price: number;
  observation: string;
}

interface ListFoodType {
  id: number;
  name: string;
}

interface RestaurantProps {
  id: number;
  name: string;
  photo_url: string;
  food_types: ListFoodType[];
}

interface OrderProps {
  id: number;
  costumer: null;
  restaurant: RestaurantProps;
  date: Date;
  dateLastUpdate: Date;
  totalValue: number;
  paymentType: string;
  status: string;
  requestItems: RequestItemsResponse[];
}

interface OrderResponse {
  content: OrderProps[];
  totalPages: number;
}

interface SectionListData {
  title: Date;
  data: OrderProps[];
}

export function Orders() {
  const {token} = useAuth();

  const [filter, setFilter] = useState(0);

  const theme = useTheme();

  const [order, setOrder] = useState<OrderProps[]>([]);

  const [orderSections, setOrderSections] = useState<SectionListData[]>([]);

  const {data, fetchData, loading} = useFetch<OrderResponse>(
    `request/costumer?page=${filter}&quantity=10`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  function onSuccess(response: OrderResponse) {
    setOrder([...order, ...response.content]);
  }

  async function loadOrder() {
    await fetchData(onSuccess);
  }

  const renderItem = ({item}: {item: OrderProps}) => {
    return item ? (
      <Content>
        <OrderCard
          photo_url={item.restaurant.photo_url}
          restaurantName={item.restaurant.name}
          statusOrder={item.status}
          orderNumber={item.id}
          foodName={item.requestItems[0].plateDTO?.name}
          foodDescription={item.requestItems[0].plateDTO?.description}
        />
      </Content>
    ) : null;
  };

  function sectionDataFormatter(data: OrderProps[]) {
    const orderFormatted: SectionListData[] = [];
    data.forEach((order: OrderProps) => {
      const sectionFound = orderFormatted.find(
        (historicSection: SectionListData) =>
          historicSection.title === order.date,
      );
      if (sectionFound) {
        sectionFound.data.push(order);
      } else {
        orderFormatted.push({
          title: order.date,
          data: [order],
        });
      }
    });
    setOrderSections(orderFormatted);
  }

  async function handleLoadOnEnd() {
    if (data.totalPages !== filter) {
      setFilter(filter + 1);
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadOrder();
    }, [filter]),
  );

  useEffect(() => {
    data.content && sectionDataFormatter([...order, ...data.content]);
  }, [data]);

  return (
    <Container>
      <StatusBar
        barStyle={'light-content'}
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <Title>Meus Pedidos</Title>
      </Header>

      <>
        <WrapperInfo>
          <SubTitle>Historico</SubTitle>
        </WrapperInfo>

        <SectionList
          sections={orderSections}
          keyExtractor={(item: any) => item.id}
          renderItem={({item}) => renderItem({item})}
          renderSectionHeader={({section: {title}}) => (
            <OrderDate>
              {moment(title).locale('pt-br').format('llll').slice(0, -9)}
            </OrderDate>
          )}
          ListFooterComponent={() => (
            <View style={{height: 250, justifyContent: 'center'}}>
              {loading && (
                <ActivityIndicator color={theme.colors.background_red} />
              )}
            </View>
          )}
          onEndReached={() => {
            handleLoadOnEnd();
          }}
          ListEmptyComponent={
            !loading ? (
              <ListEmptyComponent
                source={theme.images.noOrder}
                title="Você ainda não fez nenhum pedido"
              />
            ) : null
          }
        />
      </>
    </Container>
  );
}
