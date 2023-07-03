import { Order, Payment } from "@prisma/client";

export interface IOrder extends Partial<Order> {
  id?: number;
  createdAt?: Date;
  count: number;
  price: number;
  priceTotal: number;
  payment: Payment;
  clientId: number;
  workoutId: number;
}
