import { Payment } from '@prisma/client';
import { IEntity } from '../interfaces/entity.interface';
import { IOrder } from '../interfaces/order.interface';

export class OrderEntity implements IEntity<IOrder> {
  public id!: number;
  public createdAt!: Date;
  public count!: number;
  public price!: number;
  public priceTotal!: number;
  public payment!: Payment;
  public clientId!: number;
  public workoutId!: number;

  constructor(order: IOrder) {
    this.fillEntity(order);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(order: IOrder) {
    this.id = order.id
    this.createdAt = order.createdAt
    this.count = order.count
    this.price = order.price
    this.priceTotal = order.priceTotal
    this.payment = order.payment
    this.clientId = order.clientId
    this.workoutId = order.workoutId
  }
}
