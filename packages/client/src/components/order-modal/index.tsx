import React, { FunctionComponent } from 'react';
import { Button, Empty, Modal } from 'antd';
import { OrderDto } from '@agnos-code-challenge/shared';
import OrderTable from '../table';

type Props = {
  isVisible: boolean;
  order: OrderDto;
  onOk: () => void;
  onCancel: () => void;
};

export const OrderModal: FunctionComponent<Props> = (props) => {
  return (
    <Modal
      title={
        props.order ? `Order#: ${props.order.id.toUpperCase()}` : 'Empty Order'
      }
      centered
      visible={props.isVisible}
      closable={false}
      footer={[
        <Button shape="round" key="back" onClick={props.onCancel}>
          Return
        </Button>,
        props.order && (
          <Button
            shape="round"
            key="submit"
            type="primary"
            onClick={props.onOk}
          >
            Pay and confirm order
          </Button>
        ),
      ]}
    >
      {props.order ? <OrderTable order={props.order} /> : <Empty />}
    </Modal>
  );
};
