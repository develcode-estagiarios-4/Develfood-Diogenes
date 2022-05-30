/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, StatusBar} from 'react-native';
import {useTheme} from 'styled-components';
import {Input} from '../../components/Input';
import {Restaurants} from '../../components/Restaurants';
import {useAuth} from '../../global/Context';
import {useFetch} from '../../global/services/get';
import {
  Container,
  Content,
  Header,
  BannerWrapper,
  Banner,
  TitleWrapper,
  Title,
  RestaurantList,
} from './styles';

interface ListRestaurantProps {
  id: number;
  name: string;
  photo: string;
}
interface ListRestaurantResponse {
  content: ListRestaurantProps[];
}

export function Home() {
  const theme = useTheme();

  const {token} = useAuth();

  const {data, loading} = useFetch<ListRestaurantResponse>(
    '/restaurant?page=0&quantity=10',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return (
    <Container>
      <StatusBar
        barStyle={'light-content'}
        translucent
        backgroundColor="transparent"
      />

      <Header />

      <BannerWrapper>
        <Banner source={theme.images.banner} />
        <Banner source={theme.images.banner} />
      </BannerWrapper>

      <TitleWrapper>
        <Title>Categoria</Title>
      </TitleWrapper>

      <Content>
        <Input
          source={theme.icons.search}
          placeholder="Buscar restaurantes"
          onChangeText={() => {}}
        />

        <Text>API's</Text>
        {loading ? (
          <Text>Carregando...</Text>
        ) : (
          <View>
            <RestaurantList
              data={data.content}
              numColumns={2}
              renderItem={({item}: any) => <Restaurants name={item.name} />}
              style={{width: '100%', borderWidth: 2, marginTop: 10}}
            />
          </View>
        )}
      </Content>
    </Container>
  );
}
