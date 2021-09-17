import { Order } from '../../../src/domain/entities/order';
import { Item } from '../../../src/domain/entities/item';
import { Id } from '../../../src/domain/value-objects/id';
import { InvalidItemLineError } from '../../../src/domain/errors/invalid-item-line.error';
import { ItemLine } from '../../../src/domain/entities/item-line';
import { Quantity } from '../../../src/domain/value-objects/quantity';
import { Category } from '../../../src/domain/constants/category';
import { DiscountCalculator } from '../../../src/domain/services/discounts/discount-calculator';
import { Status } from '../../../src/domain/constants/status';
import { InvalidStatusToAddError } from '../../../src/domain/errors/invalid-status-to-add.error';
import { InvalidStatusError } from '../../../src/domain/errors/invalid-status.error';

describe('Order (Domain Entity)', function () {
  let validTestOrder: Order;
  let validTestItemLine1: ItemLine;
  let validTestItemLine2: ItemLine;

  new InvalidItemLineError();
  beforeEach(function () {
    validTestItemLine1 = new ItemLine({
      quantity: new Quantity(1),
      item: new Item({
        id: new Id('testid1'),
        name: 'testitem1',
        imageUrl: 'url',
        category: Category.BEVERAGE,
        price: 100,
        taxRate: 0,
      }),
    });
    validTestItemLine2 = new ItemLine({
      quantity: new Quantity(1),
      item: new Item({
        id: new Id('testid2'),
        name: 'testitem2',
        imageUrl: 'url',
        category: Category.MEAL,
        price: 200,
        taxRate: 0,
      }),
    });
    validTestOrder = Order.create({
      itemLine: validTestItemLine1,
    });
  });

  it('should be created successfully when valid values are passed on creation', function () {
    expect(validTestOrder).toBeDefined();
  });

  it('should throw an error when an invalid item line is passed on creation', function () {
    expect(() =>
      Order.create({
        itemLine: undefined,
      }),
    ).toThrow(InvalidItemLineError);
    expect(() =>
      Order.create({
        itemLine: null,
      }),
    ).toThrow(InvalidItemLineError);
  });

  it('should be able to add an item line to its item line list', function () {
    expect(() => validTestOrder.addItemLine(validTestItemLine2)).not.toThrow();
  });

  it('should throw an error when adding an invalid item line ', function () {
    expect(() => validTestOrder.addItemLine(undefined)).toThrow(
      InvalidItemLineError,
    );
    expect(() => validTestOrder.addItemLine(null)).toThrow(
      InvalidItemLineError,
    );
  });

  it('should increase its item line list size in 1 after adding a new item line', function () {
    const itemListSizeBefore = (validTestOrder as any).itemLines.length;
    validTestOrder.addItemLine(validTestItemLine2);
    const itemListSizeAfter = (validTestOrder as any).itemLines.length;

    expect(itemListSizeAfter).toBe(itemListSizeBefore + 1);
  });

  it(
    'should not increase its item line list size after adding an item line ' +
      'with an item that is already on an existing item line ',
    function () {
      const itemListSizeBefore = (validTestOrder as any).itemLines.length;
      validTestOrder.addItemLine(validTestItemLine1);
      const itemListSizeAfter = (validTestOrder as any).itemLines.length;

      expect(itemListSizeAfter).toBe(itemListSizeBefore);
    },
  );

  it(
    'should increase the quantity of the existing line by one after adding an ' +
      'item line with an item that is already on an existing line',
    function () {
      const itemLineQuantityBefore = (validTestItemLine1 as any).quantity.value;
      validTestOrder.addItemLine(validTestItemLine1);
      const itemLineQuantityAfter = (validTestItemLine1 as any).quantity.value;

      expect(itemLineQuantityAfter).toBe(itemLineQuantityBefore + 1);
    },
  );

  it('should be able to calculate its subtotal cost', function () {
    validTestOrder.addItemLine(validTestItemLine2);

    expect(validTestOrder.getSubTotal()).toBe(300);
  });

  it('should be able to calculate its total cost after discounts (applying five meals discount rule)', function () {
    const itemLine = new ItemLine({
      quantity: new Quantity(1),
      item: new Item({
        id: new Id('id'),
        name: 'name',
        imageUrl: 'url',
        category: Category.MEAL,
        price: 10,
        taxRate: 0.5,
      }),
    });

    const order = Order.create({ itemLine });
    order.addItemLine(itemLine);
    order.addItemLine(itemLine);
    order.addItemLine(itemLine);
    order.addItemLine(itemLine);

    expect(order.getTotal(new DiscountCalculator())).toBe(60);
  });

  it('should start with Pending status when created', function () {
    expect((validTestOrder as any).status).toBe(Status.PENDING);
  });

  it('should be able to switch from Pending to Confirmed status when confirmed', function () {
    validTestOrder.confirm();

    expect((validTestOrder as any).status).toBe(Status.CONFIRMED);
  });

  it('should be able to switch from Confirmed to Completed status when it is ready', function () {
    validTestOrder.confirm();
    validTestOrder.complete();

    expect((validTestOrder as any).status).toBe(Status.COMPLETED);
  });

  it('should not be able to add further item lines when its status is Confirmed', function () {
    validTestOrder.confirm();

    expect(() => validTestOrder.addItemLine(validTestItemLine1)).toThrow(
      InvalidStatusToAddError,
    );
  });

  it('should not be able to add further item lines when its status is Confirmed', function () {
    validTestOrder.confirm();
    validTestOrder.complete();

    expect(() => validTestOrder.addItemLine(validTestItemLine1)).toThrow(
      InvalidStatusToAddError,
    );
  });

  it('should not be able to switch from Pending to Completed state', function () {
    expect(() => validTestOrder.complete()).toThrow(InvalidStatusError);
  });

  it('should not be able to switch from Completed to Confirmed state', function () {
    validTestOrder.confirm();
    validTestOrder.complete();

    expect(() => validTestOrder.confirm()).toThrow(InvalidStatusError);
  });
});
