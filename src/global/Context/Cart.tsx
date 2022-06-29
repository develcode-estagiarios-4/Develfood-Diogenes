/* eslint-disable react-hooks/exhaustive-deps */
import React, {createContext, useContext, useState} from 'react';
import {useEffect} from 'react';
import {Alert} from 'react-native';

interface AuthProviderProps {
  children: React.ReactNode;
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
}

interface ItemProps {
  id: string;
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

  useEffect(() => {
    console.log(cart, total, totalItems);
  }, [cart]);

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

  function clearCart(id: any) {
    const removeAllProducts = [...cart];
    const item = removeAllProducts.find((product: any) => product.id === id);

    if (item.quantity > 1) {
      setCart([]);
      setTotal(0);
      setTotalItems(0);
    }
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
