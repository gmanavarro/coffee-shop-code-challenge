import axios from 'axios';
import { ORDER_COMPLETED_EVENT_ROUTE } from './api-routes';
import {
  IdParamDto,
  OrderCompletedEventDto,
} from '@agnos-code-challenge/shared';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const API = axios.create({
  baseURL: BASE_URL,
});

export function getOrderCompletedNotification({
  id,
}: IdParamDto): Promise<OrderCompletedEventDto> {
  return new Promise<OrderCompletedEventDto>((resolve) => {
    const eventSource = new EventSource(
      (BASE_URL + ORDER_COMPLETED_EVENT_ROUTE).replace(':id', id),
    );
    eventSource.onmessage = (jsonEvent: MessageEvent) => {
      const data = JSON.parse(jsonEvent.data.toString());
      console.log('New message', data);
      resolve({ data });
    };
  });
}
