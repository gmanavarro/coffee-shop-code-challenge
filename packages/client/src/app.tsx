import React, { FunctionComponent, useEffect, useState } from 'react';
import { BaseLayout } from './layouts/base';
import Grid from './components/grid';
import { useAppDispatch, useAppSelector } from './hooks';
import { getItems, createOrder, addItemToOrder } from './actions';
import { ItemDto, OrderDto } from '@agnos-code-challenge/shared';
import { OrderModal } from './components/order-modal';

export const App: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.items);
  const activeOrder = useAppSelector((state) => state.activeOrder);
  const isLoadingItems = useAppSelector((state) => state.isLoadingItems);
  const [isOrderModalVisible, setOrderModalVisibility] = useState(false);

  function handleAddItemClick(item: ItemDto) {
    if (!activeOrder) {
      dispatch(createOrder({ itemId: item.id }));
      return;
    }
    dispatch(addItemToOrder({ itemId: item.id, id: activeOrder.id }));
  }

  function handleShowOrderDetailClick(value: boolean) {
    setOrderModalVisibility(value);
  }

  useEffect(() => {
    dispatch(getItems());
  }, []);

  return (
    <BaseLayout onBadgeButtonClick={() => handleShowOrderDetailClick(true)}>
      <Grid
        isLoading={isLoadingItems}
        items={items}
        onElementButtonClick={handleAddItemClick}
      />
      <OrderModal
        isVisible={isOrderModalVisible}
        order={activeOrder as OrderDto}
        onOk={() => setOrderModalVisibility(false)}
        onCancel={() => setOrderModalVisibility(false)}
      />
    </BaseLayout>
  );
};
