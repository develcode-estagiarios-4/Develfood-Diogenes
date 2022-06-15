/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StatusBar, View} from 'react-native';
import {useTheme} from 'styled-components';
import {useDebouncedCallback} from 'use-debounce';
import {BackButton} from '../../components/BackButton';
import {Input} from '../../components/Input';
import {ListEmptyComponent} from '../../components/ListEmptyComponent';
import {Plates} from '../../components/Plates';
import {useAuth} from '../../global/Context';
import {useFetch} from '../../global/services/get';

import {
  Container,
  Header,
  FavoriteIconWrapper,
  IconButton,
  FavoriteIcon,
  WrapperRestaurantInfo,
  WrapperRestaurantTypes,
  NameRestaurant,
  TypeFood,
  WrapperPhoto,
  RestaurantPhoto,
  LineBetween,
  Content,
  PlatesList,
  Title,
  PlatesWrapper,
} from './styles';

interface Plate {
  id: number;
  name: string;
  description: string;
  price: number;
  foodType: {
    id: number;
    name: string;
  };
  retaurantName: string;
  photo_url: {
    code: string;
  };
}

interface ListPlateResponse {
  content: Plate[];
}

interface Photo {
  id: number;
  code: string;
}

export function RestaurantProfile({route}: any) {
  const navigation = useNavigation();
  const {id, name, photo_url} = route.params;

  const {token} = useAuth();

  const theme = useTheme();

  const [isPressed, setIsPressed] = useState(false);

  function handlerBackButton() {
    navigation.navigate('Home' as never);
  }

  const [plate, setPlate] = useState([]);

  const [filter, setFilter] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const {fetchData} = useFetch<ListPlateResponse>(
    `/plate/search?name=${filter}&restaurantid=${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const {data, fetchData: fetchPhoto} = useFetch<Photo>(photo_url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  function onSuccess(response: any) {
    setPlate([...plate, ...response] as never);
  }

  async function loadPlates() {
    setIsLoading(true);
    await fetchData(onSuccess);
    setIsLoading(false);
  }

  function handleSearch(value: string) {
    setIsLoading(true);
    if (value.length > 1) {
      setPlate([]);
      setFilter(value);
    } else {
      setPlate([]);
      setFilter('');
    }
    setIsLoading(false);
  }

  const debounced = useDebouncedCallback(value => {
    handleSearch(value);
  }, 1500);

  useEffect(() => {
    loadPlates();
    fetchPhoto();
  }, [filter]);

  return (
    <Container>
      <StatusBar
        barStyle={'dark-content'}
        translucent
        backgroundColor={theme.colors.background}
      />

      <Header>
        <BackButton onPressed={handlerBackButton} name="arrow" />

        <FavoriteIconWrapper>
          <IconButton onPress={() => setIsPressed(!isPressed)}>
            <FavoriteIcon
              source={theme.icons.favoriteRestaurant}
              style={
                isPressed ? {tintColor: theme.colors.background_red} : null
              }
            />
          </IconButton>
        </FavoriteIconWrapper>
      </Header>

      <WrapperRestaurantInfo>
        <WrapperRestaurantTypes>
          <NameRestaurant>{name}</NameRestaurant>
          <TypeFood>Lanche</TypeFood>
        </WrapperRestaurantTypes>

        <WrapperPhoto>
          <RestaurantPhoto
            source={
              data.code
                ? {
                    uri: `${data.code}`,
                  }
                : theme.images.noImage
            }
          />
        </WrapperPhoto>
      </WrapperRestaurantInfo>

      <LineBetween />

      <PlatesList
        data={plate}
        keyExtractor={(item: any) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <Content>
              <Title>Pratos</Title>

              <Input
                source={theme.icons.search}
                placeholder={`Buscar em ${name}`}
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
          <PlatesWrapper>
            <Plates
              name={item.name}
              description={item.description}
              price={item.price}
              source={item.photo_url}
            />
          </PlatesWrapper>
        )}
        ListEmptyComponent={
          !isLoading ? (
            <ListEmptyComponent title="Nenhum prato encontrado" />
          ) : null
        }
      />
    </Container>
  );
}
