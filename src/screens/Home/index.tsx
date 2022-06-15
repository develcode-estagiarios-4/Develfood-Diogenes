/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Dimensions, StatusBar, View} from 'react-native';
import {useTheme} from 'styled-components';
import {Input} from '../../components/Input';
import {useAuth} from '../../global/Context';
import {useFetch} from '../../global/services/get';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDebouncedCallback} from 'use-debounce';
import {useNavigation} from '@react-navigation/native';

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
import {ListEmptyComponent} from '../../components/ListEmptyComponent';

interface ListRestaurantProps {
  food_types: ListFoodType[];
  id: number;
  name: string;
  photo_url: {
    code: string;
  };
}
interface ListRestaurantResponse {
  content: ListRestaurantProps[];
  number: number;
  totalPages: number;
}
interface ListFoodType {
  id: number;
  name: string;
}

const CardMargins =
  (Dimensions.get('screen').width - RFValue(312)) / RFValue(3.5);

export function Home() {
  const theme = useTheme();

  const {token} = useAuth();

  const [isFiltred, setIsFiltred] = useState({
    text: '',
    page: 0,
  });

  const navigation = useNavigation();

  function handleRestaurantProfile(id: number, name: string, code: string) {
    navigation.navigate(
      'RestaurantProfile' as never,
      {id, name, code} as never,
    );
  }

  const {data, fetchData} = useFetch<ListRestaurantResponse>(
    `/restaurant/filter?name=${isFiltred.text}&page=${isFiltred.page}&quantity=10`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const [isLoading, setIsLoading] = useState(false);

  const [restaurants, setRestaurants] = useState([]);

  function onSuccess(response: any) {
    setRestaurants([...restaurants, ...response.content] as never);
  }

  async function loadRestaurants() {
    setIsLoading(true);
    await fetchData(onSuccess);
    setIsLoading(false);
  }

  async function handleLoadOnEnd() {
    if (data.totalPages !== isFiltred.page) {
      setIsFiltred({...isFiltred, page: isFiltred.page + 1});
    }
  }

  function handleSearch(value: string) {
    setIsLoading(true);
    if (value.length > 1) {
      setRestaurants([]);
      setIsFiltred({text: value, page: 0});
    } else {
      setRestaurants([]);
      setIsFiltred({text: '', page: 0});
    }
    setIsLoading(false);
  }

  const debounced = useDebouncedCallback(value => {
    handleSearch(value);
  }, 1500);

  useEffect(() => {
    loadRestaurants();
  }, [isFiltred]);

  return (
    <>
      <Container>
        <RestaurantList
          data={restaurants}
          keyExtractor={(item: any) => item.id}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            paddingHorizontal: RFValue(CardMargins),
            paddingBottom: 10,
          }}
          contentContainerStyle={{
            width: '100%',
          }}
          ListHeaderComponent={
            <>
              <StatusBar
                barStyle={'light-content'}
                translucent
                backgroundColor={theme.colors.background_red}
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
                  onChangeText={value => debounced(value)}
                />
              </Content>
            </>
          }
          ListFooterComponent={() => (
            <View style={{height: 50, justifyContent: 'center'}}>
              {isLoading && (
                <ActivityIndicator color={theme.colors.background_red} />
              )}
            </View>
          )}
          renderItem={({item}: any) => (
            <RestaurantListWrapper>
              <Restaurants
                onPress={() =>
                  handleRestaurantProfile(item.id, item.name, item.photo)
                }
                name={item.name}
                category={
                  item.food_types.length > 0
                    ? item.food_types[0]?.name.charAt(0).toUpperCase() +
                      item.food_types[0]?.name.slice(1).toLowerCase()
                    : ''
                }
                avaliation={item.id}
                source={
                  item.photo_url.code
                    ? {
                        uri: `${item.photo_url.code}`,
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
          ListEmptyComponent={
            !isLoading ? (
              <ListEmptyComponent title="Nenhum restaurante encontrado" />
            ) : null
          }
        />
      </Container>
    </>
  );
}
