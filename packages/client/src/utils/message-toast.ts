import { MessageType } from './constants';
import { message } from 'antd';

export function showMessageToast(params: { type: MessageType; msg: string }) {
  if (params.type === MessageType.SUCCESS) return message.success(params.msg);
  if (params.type === MessageType.ERROR) return message.error(params.msg);
}
