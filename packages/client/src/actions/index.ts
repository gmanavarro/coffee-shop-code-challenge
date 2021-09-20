import { API, getOrderCompletedNotification } from '../services/api';
import {
  ADD_ITEM_TO_ORDER_ROUTE,
  CONFIRM_ORDER_ROUTE,
  CREATE_ORDER_ROUTE,
  GET_ITEMS_ROUTE,
} from '../services/api-routes';
import { showMessageToast } from '../utils/show-message-toast';
import {
  ITEM_ADDED_SUCCESS_MESSAGE,
  NotificationType,
  ORDER_COMPLETED_SUCCESS_MESSAGE,
  ORDER_CONFIRMED_SUCCESS_MESSAGE,
  ORDER_CREATED_SUCCESS_MESSAGE,
} from '../utils/constants';
import { AxiosError } from 'axios';
import {
  ADD_ITEM_TO_ORDER,
  COMPLETE_ORDER,
  CONFIRM_ORDER,
  CREATE_ORDER,
  GET_ITEMS,
} from './types';
import { AppDispatch } from '../store';
import {
  AddItemToOrderDto,
  CreateOrderDto,
  IdParamDto,
  OrderCompletedEventDto,
} from '@agnos-code-challenge/shared';
import { showNotificationToast } from '../utils/show-notification-toast';

export function getItems(): any {
  return (dispatch: AppDispatch) =>
    dispatch({
      type: GET_ITEMS,
      promise: API.get(GET_ITEMS_ROUTE),
      meta: {
        onFailure: (error: AxiosError) => {
          showMessageToast({
            type: NotificationType.ERROR,
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
            type: NotificationType.SUCCESS,
            msg: ORDER_CREATED_SUCCESS_MESSAGE,
          }),
        onFailure: (error: AxiosError) => {
          showMessageToast({
            type: NotificationType.ERROR,
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
            type: NotificationType.SUCCESS,
            msg: ITEM_ADDED_SUCCESS_MESSAGE,
          }),
        onFailure: (error: AxiosError) => {
          showMessageToast({
            type: NotificationType.ERROR,
            msg: error?.response?.data?.message,
          });
          console.error(error);
        },
      },
    });
}

export function confirmOrder({ id }: IdParamDto): any {
  return (dispatch: AppDispatch) =>
    dispatch({
      type: CONFIRM_ORDER,
      promise: API.post(CONFIRM_ORDER_ROUTE.replace(':id', id), { id }),
      meta: {
        onSuccess: () => {
          dispatch(completeOrder({ id }));
          showNotificationToast({
            type: NotificationType.SUCCESS,
            ...ORDER_CONFIRMED_SUCCESS_MESSAGE,
          });
        },
        onFailure: (error: AxiosError) => {
          showMessageToast({
            type: NotificationType.ERROR,
            msg: error?.response?.data?.message,
          });
          console.error(error);
        },
      },
    });
}

export function completeOrder({ id }: IdParamDto): any {
  return (dispatch: AppDispatch) =>
    dispatch({
      type: COMPLETE_ORDER,
      promise: getOrderCompletedNotification({ id }),
      meta: {
        onSuccess: (event: OrderCompletedEventDto) => {
          showNotificationToast({
            type: NotificationType.SUCCESS,
            message: event.data.message,
            description: ORDER_COMPLETED_SUCCESS_MESSAGE,
          });
        },
        onFailure: (error: AxiosError) => {
          showMessageToast({
            type: NotificationType.ERROR,
            msg: error?.response?.data?.message,
          });
          console.error(error);
        },
      },
    });
}
