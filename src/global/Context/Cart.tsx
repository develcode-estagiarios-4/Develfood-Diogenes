import React, {createContext, useContext, useState} from 'react';

interface AuthProviderProps {
  children: React.ReactNode;
}

const CartContext = createContext({} as any);

function CartProvider({children}: AuthProviderProps) {
  const [cart, setCart] = useState<any[]>([]);

  console.log(cart);

  function addProductToCart(id: any, price: number) {
    const addingProducts = [...cart];

    const item = addingProducts.find((product: any) => product.id === id);

    if (!item) {
      addingProducts.push({id: id, quantity: 1, price: price});
    } else {
      item.quantity += 1;
      item.price += price;
    }

    setCart(addingProducts);
  }

  function removeProductFromCart(id: any, price: number) {
    const removingProducts = [...cart];

    const item = removingProducts.find((product: any) => product.id === id);

    if (item.quantity > 1) {
      item.quantity -= 1;
      item.price -= price;
      setCart(removingProducts);
    } else {
      const filterCart = removingProducts.filter(
        (product: any) => product.id !== id,
      );
      setCart(filterCart);
    }
  }

  function removeAllProductsFromCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addProductToCart,
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
