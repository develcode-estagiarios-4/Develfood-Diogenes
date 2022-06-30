/* eslint-disable react-hooks/exhaustive-deps */
import React, {createContext, useContext, useState} from 'react';
import {useEffect} from 'react';
import {Alert} from 'react-native';
import {useAuth} from '.';
import {useFetch} from '../services/get';
import {usePost} from '../services/post';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AddressRequest {
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  zipCode: string;
  state: string;
  nickname: string;
}

interface CostumerRequest {
  id: number;
  firstName: string;
  lastName: string;
  address: AddressRequest[];
  photo_url: string;
}

interface FoodTypeResponse {
  id: number;
  name: string;
}

interface RestaurantResponse {
  id: number;
  name: string;
  photo_url: string;
  food_types: FoodTypeResponse[];
}

interface PlateDTOResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  foodType: FoodTypeResponse;
  restaurantName: string;
  photo_url: string;
}

interface RequestItemResponse {
  id: number;
  plateDTO: PlateDTOResponse;
}

interface CartResponse {
  id: number;
  costumer: CostumerRequest;
  restaurant: RestaurantResponse;
  date: Date;
  dateLastUpdate: Date;
  totalValue: number;
  paymentType: string;
  status: string;
  requestItems: RequestItemResponse[];
  quantity: number;
  price: number;
  observation: string;
}

interface ResquestItemsResponse {
  plate: {
    id: number;
    price: number;
  };
  quantity: number;
  price: number;
  observation: string;
}

interface UserID {
  id: number;
}

interface CartRequest {
  costumer: {
    id: number;
  };
  restaurant: {
    id: number;
  };
  date: any;
  dateLastUpdate: any;
  totalValue: number;
  paymentType: string;
  status: string;
  requestItems: ResquestItemsResponse[];
  restaurantPromotion: null;
}

interface Props {
  addNewProductoCart: Function;
  addProductToCart: Function;
  removeProductFromCart: Function;
  cleanUpSamePlates: Function;
  clearCart: Function;
  cart: ItemProps[];
  totalItems: number;
  total: number;
  nameRestaurant: string;
  foodTypes: any;
  restaurantPhoto: string;
  userRequestCheckout: Function;
  userID: number;
}

interface ItemProps {
  id: number;
  quantity: number;
  price: number;
  restaurantID: number;
  name: string;
  description: string;
  source: string;
  restaurantFoodTypes: string;
  restaurantName: string;
  photoRestaurant: string;
}

const CartContext = createContext({} as Props);

function CartProvider({children}: AuthProviderProps) {
  const [cart, setCart] = useState<any[]>([]);

  const [total, setTotal] = useState(0);

  const [totalItems, setTotalItems] = useState<any>(0);

  const [nameRestaurant, setNameRestaurant] = useState('');

  const [foodTypes, setFoodTypes] = useState<any>([]);

  const [restaurantPhoto, setRestaurantPhoto] = useState('');

  useEffect(() => {}, [cart]);

  function addNewProductoCart(
    id: string,
    price: number,
    restaurantID: number,
    name: string,
    description: string,
    source: string,
    restaurantFoodTypes: string,
    restaurantName: string,
    photoRestaurant: string,
  ) {
    const addProducts = [...cart];

    const item = addProducts.find((product: any) => product.id === id);

    const fromOtherRestaurant = addProducts.find(
      (product: any) => product.restaurantID !== restaurantID,
    );

    if (!fromOtherRestaurant) {
      if (!item) {
        addProducts.push({
          id,
          quantity: 1,
          price,
          unityPrice: price,
          restaurantID,
          name,
          description,
          source,
          restaurantFoodTypes,
          restaurantName,
          photoRestaurant,
        });
      } else {
        item.quantity += 1;
        item.price += price;
      }
      setCart(addProducts);
      setTotal(total + price);
      setTotalItems(totalItems + 1);
      setNameRestaurant(restaurantName);
      setFoodTypes(restaurantFoodTypes);
      setRestaurantPhoto(photoRestaurant);
    } else {
      Alert.alert(
        'Você não pode adicionar produtos de restaurantes diferentes',
      );
    }
  }

  function addProductToCart(
    id: string,
    price: number,
    restaurantID: number,
    name: string,
    description: string,
    source: string,
  ) {
    const addingProducts = [...cart];

    const item = addingProducts.find((product: any) => product.id === id);

    const fromOtherRestaurant = addingProducts.find(
      (product: any) => product.restaurantID !== restaurantID,
    );

    if (!fromOtherRestaurant) {
      if (!item) {
        addingProducts.push({
          id,
          quantity: 1,
          price,
          restaurantID,
          name,
          description,
          source,
        });
      } else {
        item.quantity += 1;
        item.price += price;
      }
      setCart(addingProducts);
      setTotal(total + price);
      setTotalItems(totalItems + 1);
    } else {
      Alert.alert(
        'Você não pode adicionar produtos de restaurantes diferentes',
      );
    }
  }

  function removeProductFromCart(id: any, price: number) {
    const removingProducts = [...cart];

    const item = removingProducts.find((product: any) => product.id === id);

    if (item.quantity > 1) {
      item.quantity -= 1;
      item.price -= price;
      setTotal(total - price);
      setCart(removingProducts);
      setTotalItems(totalItems - 1);
    } else {
      const filterCart = removingProducts.filter(
        (product: any) => product.id !== id,
      );
      setCart(filterCart);
      setTotal(total - price);
      setTotalItems(totalItems - 1);
    }
  }

  function cleanUpSamePlates(id: string) {
    const removeAllProducts = [...cart];

    const item = removeAllProducts.find((product: any) => product.id === id);

    if (item.quantity >= 1) {
      setTotal(total - item.price);
      setTotalItems(totalItems - item.quantity);
      setCart(removeAllProducts.filter((product: any) => product.id !== id));
    }
  }

  function clearCart() {
    cart.splice(0, cart.length);
    setTotal(0);
    setTotalItems(0);
  }

  const {token} = useAuth();

  const {data, fetchData} = useFetch<UserID>('/auth', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  const {handlerPost} = usePost<CartRequest, CartResponse>('/request', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const [userID, setUserID] = useState(0);

  useEffect(() => {
    setUserID(data.id);
    console.log(data.id);
  }, [userID]);

  const loginError = (error: any) => {
    Alert.alert(
      'Erro',
      error.response.data.status === 409
        ? 'Usuário não encontrado'
        : error.response.data.message,
    );
    console.log('Erro =>', error.response.data);
  };

  async function userRequestCheckout(CheckoutUserSuccess: () => void) {
    const createUserRequest: CartRequest = {
      costumer: {
        id: data.id,
      },
      restaurant: {
        id: cart[0].restaurantID,
      },
      date: new Date().toString,
      dateLastUpdate: new Date().toString,
      totalValue: total,
      paymentType: 'card',
      status: 'PEDIDO_REALIZADO',
      requestItems: cart.map((item: any) => {
        return {
          plate: {
            id: item.id,
            price: item.price,
          },
          quantity: item.quantity,
          price: item.price,
          observation: '',
        };
      }),
      restaurantPromotion: null,
    };
    await handlerPost(createUserRequest, loginError, CheckoutUserSuccess);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addNewProductoCart,
        addProductToCart,
        totalItems,
        total,
        removeProductFromCart,
        cleanUpSamePlates,
        clearCart,
        nameRestaurant,
        foodTypes,
        restaurantPhoto,
        userRequestCheckout,
        userID,
      }}>
      {children}
    </CartContext.Provider>
  );
}

function useCreateCart() {
  const Context = useContext(CartContext);

  return Context;
}

export {useCreateCart, CartProvider};
