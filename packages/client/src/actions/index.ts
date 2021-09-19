import { API } from '../services/api';
import {
  ADD_ITEM_TO_ORDER_ROUTE,
  CREATE_ORDER_ROUTE,
  GET_ITEMS_ROUTE,
} from '../services/api-routes';
import { showMessageToast } from '../utils/message-toast';
import {
  ITEM_ADDED_SUCCESS_MESSAGE,
  MessageType,
  ORDER_CREATED_SUCCESS_MESSAGE,
} from '../utils/constants';
import { AxiosError } from 'axios';
import { ADD_ITEM_TO_ORDER, CREATE_ORDER, GET_ITEMS } from './types';
import { AppDispatch } from '../store';
import {
  AddItemToOrderDto,
  CreateOrderDto,
  IdParamDto,
} from '@agnos-code-challenge/shared';

export function getItems(): any {
  return (dispatch: AppDispatch) =>
    dispatch({
      type: GET_ITEMS,
      promise: API.get(GET_ITEMS_ROUTE),
      meta: {
        onFailure: (error: AxiosError) => {
          showMessageToast({
            type: MessageType.ERROR,
            msg: error?.response?.data?.message,
          });
          console.error(error);
        },
      },
    });
}

export function createOrder(params: CreateOrderDto): any {
  return (dispatch: AppDispatch) =>
    dispatch({
      type: CREATE_ORDER,
      promise: API.post(CREATE_ORDER_ROUTE, params),
      meta: {
        onSuccess: () =>
          showMessageToast({
            type: MessageType.SUCCESS,
            msg: ORDER_CREATED_SUCCESS_MESSAGE,
          }),
        onFailure: (error: AxiosError) => {
          showMessageToast({
            type: MessageType.ERROR,
            msg: error?.response?.data?.message,
          });
          console.error(error);
        },
      },
    });
}

export function addItemToOrder({
  itemId,
  id,
}: AddItemToOrderDto & IdParamDto): any {
  return (dispatch: AppDispatch) =>
    dispatch({
      type: ADD_ITEM_TO_ORDER,
      promise: API.post(ADD_ITEM_TO_ORDER_ROUTE.replace(':id', id), { itemId }),
      meta: {
        onSuccess: () =>
          showMessageToast({
            type: MessageType.SUCCESS,
            msg: ITEM_ADDED_SUCCESS_MESSAGE,
          }),
        onFailure: (error: AxiosError) => {
          showMessageToast({
            type: MessageType.ERROR,
            msg: error?.response?.data?.message,
          });
          console.error(error);
        },
      },
    });
}
