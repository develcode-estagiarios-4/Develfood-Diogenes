/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {useTheme} from 'styled-components';
import {useAuth} from '../../global/Context';
import {useFetch} from '../../global/services/get';
import {
  Wrapper,
  Container,
  RestaurantImage,
  FavoriteIconWrapper,
  IconButton,
  FavoriteIcon,
  Content,
  TitleWrapper,
  Title,
  Description,
  SubTitle,
  Avaliation,
  StarRatio,
  NumberRatio,
} from './styled';

interface ListRestaurantProps {
  name: string;
  category: any;
  source: any;
  onPress: () => void;
}

interface Photos {
  id: number;
  code: string;
}

export function Restaurants({
  name,
  category,
  source,
  onPress,
}: ListRestaurantProps) {
  const theme = useTheme();

  const [isPressed, setIsPressed] = useState(false);

  const {token} = useAuth();

  const [photos, setPhotos] = useState<Photos[]>([]);

  const {data, fetchData} = useFetch<Photos>(`/photo/${source}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  function onSuccess(response: any) {
    setPhotos([...photos, ...response]);
  }

  useEffect(() => {
    fetchData(onSuccess);
  }, []);

  return (
    <Wrapper onPress={onPress} activeOpacity={0}>
      <Container>
        <RestaurantImage
          source={data.code ? {uri: `${data.code}`} : theme.images.noImage}
        />

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
        <Content>
          <TitleWrapper>
            <Title>{name}</Title>
          </TitleWrapper>

          <Description>
            <SubTitle>{category}</SubTitle>

            <Avaliation>
              <StarRatio source={theme.icons.starRatio} />
              <NumberRatio>{Math.ceil(Math.random() * 5)}</NumberRatio>
            </Avaliation>
          </Description>
        </Content>
      </Container>
    </Wrapper>
  );
}
