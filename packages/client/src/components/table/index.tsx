import React, { FunctionComponent } from 'react';
import { Space, Statistic, Table } from 'antd';
import { OrderDto } from '@agnos-code-challenge/shared';
import styled from 'styled-components';

type Props = {
  order: OrderDto;
};

const columns = [
  {
    title: 'Product',
    dataIndex: ['item', 'name'],
    key: 'name',
  },
  {
    title: 'Category',
    dataIndex: ['item', 'category'],
    key: 'category',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Price',
    dataIndex: ['item', 'price'],
    key: 'price',
  },
  {
    title: 'Tax rate',
    dataIndex: ['item', 'taxRate'],
    key: 'taxRate',
  },
  {
    title: 'Line total',
    render: (record: any) =>
      record.item.price + record.item.price * record.item.taxRate,
  },
];

const TotalValuesContainer = styled.div`
  display: flex;
  margin-top: 1rem;
  width: 100%;
  justify-content: space-around;
`;

const OrderTable: FunctionComponent<Props> = (props) => {
  return (
    <>
      <Table
        columns={columns}
        dataSource={props.order?.lines}
        pagination={false}
      />
      <TotalValuesContainer>
        <Statistic
          title="Discount"
          value={props.order.subtotal - props.order.total}
        />
        <Statistic title="Total" value={props.order.total} />
      </TotalValuesContainer>
    </>
  );
};

export default OrderTable;
