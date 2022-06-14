import React, {useState} from 'react';
import {useTheme} from 'styled-components';
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

export function Restaurants({
  name,
  category,
  source,
  onPress,
}: ListRestaurantProps) {
  const theme = useTheme();

  const [isPressed, setIsPressed] = useState(false);

  return (
    <Wrapper onPress={onPress} activeOpacity={0.2}>
      <Container>
        <RestaurantImage source={source} />

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
