import { NotificationType } from './constants';
import { message } from 'antd';

export function showMessageToast(params: {
  type: NotificationType;
  msg: string;
}) {
  message[params.type](params.msg);
}
