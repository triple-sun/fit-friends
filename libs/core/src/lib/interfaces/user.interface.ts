import { Role, User } from "@prisma/client";
import { IClient } from "./client.interface";
import { ICoach } from "./coach.interface";
import { IReview } from "./review.interface";
import { IOrder } from "./order.interface";
import { IPersonal } from "./personal.interface";

export interface IUser extends Partial<User> {
  name: string;
  email: string;
  role: Role;
  password?: string;

  reviews?: IReview[];
  orders?: IOrder[];
  personals?: IPersonal[]
  clientInfo?: IClient;
  coachInfo?: ICoach;
}
