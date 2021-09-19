import React, { FunctionComponent, useEffect } from 'react';
import { BaseLayout } from './layouts/base';
import Grid from './components/grid';
import { useAppDispatch, useAppSelector } from './hooks';
import { getItems, createOrder, addItemToOrder } from './actions';
import { ItemDto } from '@agnos-code-challenge/shared';

export const App: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.items);
  const activeOrder = useAppSelector((state) => state.activeOrder);
  const isLoadingItems = useAppSelector((state) => state.isLoadingItems);

  function handleAddItem(item: ItemDto) {
    console.log(activeOrder);
    if (!activeOrder) {
      dispatch(createOrder({ itemId: item.id }));
      return;
    }
    dispatch(addItemToOrder({ itemId: item.id, id: activeOrder.id }));
  }

  useEffect(() => {
    dispatch(getItems());
  }, []);

  return (
    <BaseLayout>
      <Grid
        isLoading={isLoadingItems}
        items={items}
        onElementButtonClick={handleAddItem}
      />
    </BaseLayout>
  );
};
