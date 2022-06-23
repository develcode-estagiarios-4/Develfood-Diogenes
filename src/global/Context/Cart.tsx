/* eslint-disable react-hooks/exhaustive-deps */
import React, {createContext, useContext, useState} from 'react';
import {useEffect} from 'react';
import {Alert} from 'react-native';

interface AuthProviderProps {
  children: React.ReactNode;
}

const CartContext = createContext({} as any);

function CartProvider({children}: AuthProviderProps) {
  const [cart, setCart] = useState<any[]>([]);

  const [total, setTotal] = useState(0);

  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    console.log(cart, total, totalItems);
  }, [cart]);

  function addProductToCart(id: any, price: number, restaurantID: any) {
    const addingProducts = [...cart];

    const item = addingProducts.find((product: any) => product.id === id);

    const fromOtherRestaurant = addingProducts.find(
      (product: any) => product.restaurantID !== restaurantID,
    );

    if (!fromOtherRestaurant) {
      if (!item) {
        addingProducts.push({
          id: id,
          quantity: 1,
          price: price,
          restaurantID: restaurantID,
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

  function removeAllProductsFromCart(id: any) {
    const removeAllProducts = [...cart];

    const item = removeAllProducts.find((product: any) => product.id === id);

    if (item.quantity > 1) {
      setTotal(total - item.price);
      setTotalItems(totalItems - item.quantity);
      setCart(removeAllProducts.filter((product: any) => product.id !== id));
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addProductToCart,
        totalItems,
        total,
        removeProductFromCart,
        removeAllProductsFromCart,
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