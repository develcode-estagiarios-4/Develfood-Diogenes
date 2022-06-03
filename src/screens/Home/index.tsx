/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useState} from 'react';
import {ActivityIndicator, StatusBar, View} from 'react-native';
import {useTheme} from 'styled-components';
import {Input} from '../../components/Input';
import {useAuth} from '../../global/Context';
import {useFetch} from '../../global/services/get';

import {Restaurants} from '../../components/Restaurants';
import {Category} from '../../components/CategoryButton';

import {
  Container,
  Content,
  Header,
  BannerWrapper,
  Banner,
  TitleWrapper,
  Title,
  CategorySelect,
  RestaurantListWrapper,
  RestaurantList,
} from './styles';
import {useFocusEffect} from '@react-navigation/native';

interface ListRestaurantProps {
  id: number;
  name: string;
  photo: string;
}
interface ListRestaurantResponse {
  content: ListRestaurantProps[];
  number: number;
  totalPages: number;
}

export function Home() {
  const theme = useTheme();

  const {token} = useAuth();

  const [page, setPage] = useState(0);

  const {data, loading, fetchData} = useFetch<ListRestaurantResponse>(
    `/restaurant?page=${page}&quantity=10`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const [restaurants, setRestaurants] = useState([]);

  function onSuccess(response: any) {
    setRestaurants([...restaurants, ...response.content] as never);
  }

  async function loadRestaurants() {
    await fetchData(onSuccess);
    setPage(1);
  }

  async function handleLoadOnEnd() {
    if (data.number < data.totalPages - 1) {
      await fetchData(onSuccess);
      setPage(page + 1);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchData();
      setRestaurants([]);
      loadRestaurants();
    }, []),
  );

  return (
    <>
      <Container>
        <RestaurantList
          data={restaurants}
          keyExtractor={(item: any) => item.id}
          numColumns={2}
          ListHeaderComponent={() => (
            <>
              <StatusBar
                barStyle={'light-content'}
                translucent
                backgroundColor="#C20C18"
              />
              <Header />

              <BannerWrapper>
                <Banner source={theme.images.banner} />
                <Banner source={theme.images.banner} />
              </BannerWrapper>

              <TitleWrapper>
                <Title>Categoria</Title>
              </TitleWrapper>

              <CategorySelect
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <Category title="Pizza" />
                <Category title="Churrasco" />
                <Category title="Almoço" />
                <Category title="Massas" />
                <Category title="Coreana" />
                <Category title="Japonesa" />
                <Category title="Tailandesa" />
                <Category title="Chinesa" />
              </CategorySelect>

              <Content>
                <Input
                  source={theme.icons.search}
                  placeholder="Buscar restaurantes"
                  keyboardType="email-address"
                  onChangeText={() => {}}
                />
              </Content>
            </>
          )}
          ListFooterComponent={() => (
            <View style={{height: 50, justifyContent: 'center'}}>
              {loading && (
                <ActivityIndicator color={theme.colors.background_red} />
              )}
            </View>
          )}
          renderItem={({item}: any) => (
            <RestaurantListWrapper>
              <Restaurants
                name={item.name}
                source={
                  item.photo
                    ? {
                        uri: `${item.photo}`,
                      }
                    : theme.images.noImage
                }
              />
            </RestaurantListWrapper>
          )}
          style={{
            width: '100%',
            marginTop: 10,
            margin: 20,
          }}
          onEndReached={() => {
            handleLoadOnEnd();
          }}
        />
      </Container>
    </>
  );
}
