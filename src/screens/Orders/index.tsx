/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
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
  date: any;
  dateLastUpdate: any;
  totalValue: number;
  paymentType: string;
  status: any;
  requestItems: RequestItemsResponse[];
}

interface OrderResponse {
  content: OrderProps[];
  totalPages: number;
}

interface SectionListData {
  title: string;
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
        console.log('sectionFound');
      } else {
        orderFormatted.push({
          title: order.date,
          data: [order],
        });
        console.log('sectionNotFound');
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

// const {
//   data: ModifyUsers,
//   loading: isloadingPut,
//   handlerPut,
// } = usePut<CreateUserPut, UserDataPut>(
//   '/public/v2/users/8552',
//   {
//     email: 'diogenes@develcode611.com',
//     gender: 'male',
//     name: 'joao',
//     status: 'active',
//   },
//   {
//     headers: {
//       'Content-type': 'application/json',
//       Authorization:
//         'Bearer a4e3743577c2a9f43ef23ca81f710292e0158b333e74723043f685454876fda1',
//     },
//   },
// );

// const {
//   data: DeleteData,
//   loading: isLoadingDelete,
//   handlerDelete,
// } = useDelete<UserDataDelete>('public/v2/users/8552', {
//   headers: {
//     'Content-type': 'application/json',
//     Authorization:
//       'Bearer a4e3743577c2a9f43ef23ca81f710292e0158b333e74723043f685454876fda1',
//   },
// });

{
  /* <View>
                  <Text>
                      {data[0].email}{'\n'}
                      {data.name}{'\n'}
                      {data.gender}{'\n'}
                      {data.status}{'\n'}
                  </Text>
                </View> */
}

{
  /* <Button title="Delete" onPress={() => handlerDelete()} />

            <Button title="Put" onPress={() => handlerPut()} /> */
}

{
  /*
        <Text>{token}</Text>

        {isloadingPut ? (
          <Text>Carregando Put</Text>
        ) : (
          <View>
            <Text>{ModifyUsers?.email}</Text>
            <Text>{ModifyUsers?.gender}</Text>
            <Text>{ModifyUsers?.name}</Text>
            <Text>{ModifyUsers?.status}</Text>
          </View>
        )}

        {isLoadingDelete ? (
          <Text>Carregando Delete</Text>
        ) : (
          <View>
            <Text>{DeleteData?.email}</Text>
            <Text>{DeleteData?.gender}</Text>
            <Text>{DeleteData?.name}</Text>
            <Text>{DeleteData?.status}</Text>
          </View>
        )} */
}

// interface CreateUserPut {
//   email: string;
//   gender: string;
//   name: string;
//   status: string;
// }

// interface UserDataPut {
//   email: string;
//   gender: string;
//   name: string;
//   status: string;
// }
// interface UserDataDelete {
//   email: string;
//   gender: string;
//   name: string;
//   status: string;
// }
