import { Client, Coach, Gender, Order, Personal, Review, Role, User } from "@prisma/client";

export interface IUser extends Partial<User> {
  id?: number;
  name: string;
  email: string;
  gender?: Gender;
  role: Role;
  password?: string;
  passwordHash: string;
  reviews: Review[];
  orders: Order[];
  avatarUrl?: string;
  bgUrl?: string
  personals?: Personal[]
  clientInfo?: Client;
  coachInfo?: Coach;
  createdAt?: Date
}
