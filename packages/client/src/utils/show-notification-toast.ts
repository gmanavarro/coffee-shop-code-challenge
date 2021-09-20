import { NotificationType } from './constants';
import { notification } from 'antd';

export function showNotificationToast({
  type,
  ...params
}: {
  type: NotificationType;
  message: string;
  description: string;
}) {
  notification[type]({ ...params, duration: 4 });
}
