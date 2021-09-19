import { AnyAction } from 'redux';
import { ADD_ITEM_TO_ORDER, CREATE_ORDER, GET_ITEMS } from '../actions/types';
import { handle } from 'redux-pack';
import { ItemDto, OrderDto } from '@agnos-code-challenge/shared';
import { calculateOrderItemsCount } from '../utils/calculate-order-items-count';

export type AppState = {
  items: ItemDto[];
  activeOrder?: OrderDto;
  activeOrderItemCount: number;
  isWaitingForOrderCompletion: boolean;
  isLoadingItems: boolean;
};

const initialState: AppState = {
  items: [],
  activeOrder: undefined,
  activeOrderItemCount: 0,
  isWaitingForOrderCompletion: false,
  isLoadingItems: false,
};

export function rootReducer(state: AppState = initialState, action: AnyAction) {
  switch (action.type) {
    case GET_ITEMS:
      return handle(state, action, {
        start: (previousState) => ({ ...previousState, isLoadingItems: true }),
        success: (previousState) => ({
          ...previousState,
          isLoadingItems: false,
          items: action?.payload?.data,
        }),
        failure: (previousState) => ({
          ...previousState,
          isLoadingItems: false,
        }),
      });

    case CREATE_ORDER:
      return handle(state, action, {
        start: (previousState) => ({
          ...previousState,
          activeOrder: undefined,
          activeOrderItemCount: 0,
        }),
        success: (previousState) => ({
          ...previousState,
          activeOrder: action?.payload?.data,
          activeOrderItemCount: calculateOrderItemsCount(action?.payload.data),
        }),
        failure: (previousState) => ({
          ...previousState,
          activeOrder: undefined,
          activeOrderItemCount: 0,
        }),
      });

    case ADD_ITEM_TO_ORDER:
      return handle(state, action, {
        start: (previousState) => ({
          ...previousState,
        }),
        success: (previousState) => ({
          ...previousState,
          activeOrder: action?.payload?.data,
          activeOrderItemCount: calculateOrderItemsCount(action?.payload?.data),
        }),
        failure: (previousState) => ({
          ...previousState,
        }),
      });

    default:
      return state;
  }
}
