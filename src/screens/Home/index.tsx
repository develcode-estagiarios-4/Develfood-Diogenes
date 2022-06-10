/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StatusBar,
  Text,
  View,
} from 'react-native';
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

  function handleRestaurantProfile(id: number, name: string, photo: string) {
    navigation.navigate(
      'RestaurantProfile' as never,
      {id, name, photo} as never,
    );
  }

  const {data, loading, fetchData} = useFetch<ListRestaurantResponse>(
    `/restaurant/filter?name=${isFiltred.text}&page=${isFiltred.page}&quantity=10`,
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
  }

  async function handleLoadOnEnd() {
    if (data.totalPages !== isFiltred.page) {
      setIsFiltred({...isFiltred, page: isFiltred.page + 1});
    }
  }

  function handleSearch(value: string) {
    if (value.length > 1) {
      setRestaurants([]);
      setIsFiltred({text: value, page: 0});
    } else {
      setRestaurants([]);
      setIsFiltred({text: '', page: 0});
    }
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
              {loading && (
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
          ListEmptyComponent={
            !loading ? (
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  alignContent: 'center',
                }}>
                <Image source={theme.images.notFound} />
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 17,
                    color: 'black',
                  }}>
                  Nenhum restaurante encontrado
                </Text>
              </View>
            ) : null
          }
        />
      </Container>
    </>
  );
}
