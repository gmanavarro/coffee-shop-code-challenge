import { AnyAction } from 'redux';
import { ADD_ITEM_TO_ORDER, CREATE_ORDER, GET_ITEMS } from '../actions/types';
import { handle } from 'redux-pack';
import { ItemDto, OrderDto } from '@agnos-code-challenge/shared';

export type AppState = {
  items: ItemDto[];
  activeOrder?: OrderDto;
  isWaitingForOrderCompletion: boolean;
  isLoadingItems: boolean;
};

const initialState: AppState = {
  items: [],
  activeOrder: undefined,
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
        }),
        success: (previousState) => ({
          ...previousState,
          activeOrder: action?.payload?.data,
        }),
        failure: (previousState) => ({
          ...previousState,
          activeOrder: undefined,
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
        }),
        failure: (previousState) => ({
          ...previousState,
        }),
      });

    default:
      return state;
  }
}
