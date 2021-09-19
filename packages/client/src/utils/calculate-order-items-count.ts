import { OrderDto } from '@agnos-code-challenge/shared';

export function calculateOrderItemsCount(order: OrderDto): number {
  if (!order) return 0;
  return order.lines.reduce((count, itemLine) => count + itemLine.quantity, 0);
}
