import React, {createContext, useContext, useState} from 'react';
import {usePost} from '../services/post';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface TrolleyProps {
  createUserTrolley: Function;
  loading: boolean;
  handleSetPostData: (_postData: CreateTrolleyPost) => void;
  postData: CreateTrolleyPost;
}

interface CreateTrolleyPost {
  costumer: {id: number};
  restaurant: {id: number};
  date: Date;
  dateLastUpdated: Date;
  totalValue: number;
  paymentType: string;
  status: string;
  requestItems: [
    {
      plate: {
        id: number;
        price: number;
      };
      quantity: number;
      price: number;
      observation: string;
    },
  ];
  restaurantPromotion: {id: number} | null;
}

const createTrolley = createContext({
  loading: false,
  createUserTrolley: () => {},
  handleSetPostData: (_postData: Partial<CreateTrolleyPost>) => {},
  postData: {} as CreateTrolleyPost,
} as TrolleyProps);

function DevelTrolley({children}: AuthProviderProps) {
  const {handlerPost, loading} = usePost<CreateTrolleyPost, any>('/request');

  const [postData, setPostData] = useState<CreateTrolleyPost>(
    {} as CreateTrolleyPost,
  );

  function handleSetPostData(dataPost: CreateTrolleyPost) {
    setPostData({...postData, ...dataPost});
  }

  async function createUserTrolley(
    createTrolleySuccess: () => void,
    requestData: CreateTrolleyPost,
  ) {
    const createUserRequest: CreateTrolleyPost = {
      ...requestData,
    };
    await handlerPost(createUserRequest, createTrolleySuccess);
  }

  return (
    <createTrolley.Provider
      value={{createUserTrolley, loading, handleSetPostData, postData}}>
      {children}
    </createTrolley.Provider>
  );
}

function useTrolleyUser() {
  const Context = useContext(createTrolley);

  return Context;
}

export {useTrolleyUser, DevelTrolley};
