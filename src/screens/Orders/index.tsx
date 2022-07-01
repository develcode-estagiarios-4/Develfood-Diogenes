/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
import React, {useState} from 'react';
import {useEffect} from 'react';
import {ActivityIndicator, StatusBar, View} from 'react-native';
import {useTheme} from 'styled-components';
import {ListEmptyComponent} from '../../components/ListEmptyComponent';
import {OrderCard} from '../../components/OrderCard';
import {useAuth} from '../../global/Context';
import {useFetch} from '../../global/services/get';
import {
  Container,
  Content,
  DateOfTheDay,
  Header,
  OrderList,
  SubTitle,
  Title,
  WrapperInfo,
} from './styles';

interface PlateDTOResponse {
  id: number;
  name: any;
  description: string;
  price: number;
  foodType: ListFoodType;
  restaurantName: string;
  photo_url: string;
}

interface RequestItemsResponse {
  id: number;
  plateDTO: PlateDTOResponse[];
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

export function Orders({dateLastUpdate}: OrderProps) {
  const {token} = useAuth();

  const [filter, setFilter] = useState(0);

  const theme = useTheme();

  const [order, setOrder] = useState<OrderProps[]>([]);

  const {data, fetchData, loading, setLoading} = useFetch<OrderResponse>(
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
    setLoading(true);
    await fetchData(onSuccess);
    setLoading(false);
  }

  async function handleLoadOnEnd() {
    if (data.totalPages !== filter) {
      setLoading(true);
      setFilter(filter + 1);
    }
  }

  useEffect(() => {
    loadOrder();
    fetchData();
  }, [filter]);

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

      {order.length > 0 ? (
        <>
          <WrapperInfo>
            <SubTitle>Historico</SubTitle>
            <DateOfTheDay>{dateLastUpdate}</DateOfTheDay>
          </WrapperInfo>
          <OrderList
            data={order}
            keyExtractor={(item: any) => item.id}
            renderItem={({item}: any) => (
              <Content>
                <OrderCard
                  orderDate={
                    item.dateLastUpdate !== item.date
                      ? item.date.toString()
                      : null
                  }
                  photo_url={item.restaurant.photo_url}
                  restaurantName={item.restaurant.name}
                  statusOrder={item.status}
                  orderNumber={item.id}
                  foodName={item.requestItems[0].plateDTO?.name}
                  foodDescription={item.requestItems[0].plateDTO?.description}
                />
              </Content>
            )}
            ListFooterComponent={() => (
              <View style={{height: 50, justifyContent: 'center'}}>
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
                  source={theme.images.notFound}
                  title="Nenhum prato encontrado"
                />
              ) : null
            }
          />
        </>
      ) : (
        <ListEmptyComponent
          source={theme.images.noOrder}
          title="Vocẽ ainda não fez nenhum pedido"
        />
      )}
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
