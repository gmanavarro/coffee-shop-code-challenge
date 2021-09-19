import React, { FunctionComponent } from 'react';
import { Button, Modal } from 'antd';
import { OrderDto } from '@agnos-code-challenge/shared';

type Props = {
  isVisible: boolean;
  order: OrderDto;
  onOk: () => void;
  onCancel: () => void;
};

export const OrderModal: FunctionComponent<Props> = (props) => {
  return (
    <Modal
      title="Order"
      centered
      visible={props.isVisible}
      closable={false}
      footer={[
        <Button shape="round" key="back" onClick={props.onCancel}>
          Return
        </Button>,
        <Button shape="round" key="submit" type="primary" onClick={props.onOk}>
          Pay and confirm order
        </Button>,
      ]}
    >
      Hola
    </Modal>
  );
};
