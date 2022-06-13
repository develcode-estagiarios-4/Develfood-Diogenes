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
  description: string;
  price: number;
  foodType: {
    id: number;
    name: string;
  };
  retaurantName: string;
  photo_url: string;
}

interface ListPLateResponse {
  content: Plate[];
}

export function RestaurantProfile({route}: any) {
  const navigation = useNavigation();
  const {id, name, photo} = route.params;

  const {token} = useAuth();

  const theme = useTheme();

  const [isPressed, setIsPressed] = useState(false);

  function handlerBackButton() {
    navigation.navigate('Home' as never);
  }

  const [plate, setPlate] = useState([]);

  const [isFiltred, setIsFiltred] = useState({
    text: '',
    page: 0,
  });

  const {loading, fetchData} = useFetch<ListPLateResponse>(
    `/plate/restaurant/${id}?page=${isFiltred.page}&quantity=10`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  function onSuccess(response: any) {
    setPlate([...plate, ...response.content] as never);
  }

  async function loadPlates() {
    await fetchData(onSuccess);
  }

  async function handleLoadOnEnd() {
    setIsFiltred({...isFiltred, page: isFiltred.page + 1});
  }

  function handleSearch(value: string) {
    if (value.length > 1) {
      setPlate([]);
      setIsFiltred({text: value, page: 0});
    } else {
      setPlate([]);
      setIsFiltred({text: '', page: 0});
    }
  }

  const debounced = useDebouncedCallback(value => {
    handleSearch(value);
  }, 1500);

  useEffect(() => {
    loadPlates();
  }, [isFiltred]);

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
          <RestaurantPhoto source={photo ? photo : theme.images.noImage} />
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
            {loading && (
              <ActivityIndicator color={theme.colors.background_red} />
            )}
          </View>
        )}
        renderItem={({item}: any) => (
          <PlatesWrapper>
            <Plates
              description={item.description}
              price={item.price}
              source={
                item.photo
                  ? {
                      uri: `${item.photo}`,
                    }
                  : theme.images.noImage
              }
            />
          </PlatesWrapper>
        )}
        onEndReached={() => {
          handleLoadOnEnd();
        }}
        ListEmptyComponent={
          !loading ? (
            <ListEmptyComponent title="Nenhum prato encontrado" />
          ) : null
        }
      />
    </Container>
  );
}
