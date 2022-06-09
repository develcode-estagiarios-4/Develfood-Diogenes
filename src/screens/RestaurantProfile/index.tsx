/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StatusBar, View} from 'react-native';
import {useTheme} from 'styled-components';
import {useDebouncedCallback} from 'use-debounce';
import {BackButton} from '../../components/BackButton';
import {Input} from '../../components/Input';
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
  Content,
  LineBetween,
  PlatesList,
  Wrapper,
  Title,
} from './styles';

{
  /* <ListPLateResponse> */
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

  const [plateName, setPlateName] = useState('');

  const {loading, fetchData} = useFetch<any[]>(
    `/plate/restaurant/${id}?page=0&quantity=10`,
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

  function handleSearch(value: string) {
    if (value.length > 1) {
      setPlate([]);
      setPlateName(value);
    } else {
      setPlate([]);
      setPlateName('');
    }
  }

  const debounced = useDebouncedCallback(value => {
    handleSearch(value);
  }, 1500);

  useEffect(() => {
    loadPlates();
  }, []);

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
          <RestaurantPhoto source={theme.images.camaraoImage} />
        </WrapperPhoto>
      </WrapperRestaurantInfo>

      <Content>
        <LineBetween />

        <PlatesList
          data={plate}
          keyExtractor={(item: any) => item.id}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              <Wrapper>
                <Title>Pratos</Title>

                <Input
                  source={theme.icons.search}
                  placeholder={`Buscar em ${name}`}
                  keyboardType="email-address"
                  onChangeText={value => debounced(value)}
                />
              </Wrapper>
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
            <Plates
              description={item.description}
              price={item.price}
              source={
                item.photo
                  ? {
                      uri: `${item.photo}`,
                    }
                  : theme.images.camaraoImage
              }
            />
          )}
        />
      </Content>
    </Container>
  );
}
