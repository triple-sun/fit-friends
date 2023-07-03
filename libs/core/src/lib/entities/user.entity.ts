import { Gender, Order, Review, Role } from '@prisma/client';
import { genSalt, hash, compare } from 'bcrypt';
import { IEntity } from '../interfaces/entity.interface';
import { IUser } from '../interfaces/user.interface';


export class UserEntity implements IEntity<IUser> {
  public id?: number
  public userId?: number;
  public gender!: Gender;
  public email!: string;
  public name!: string;
  public password?: string;
  public passwordHash!: string;
  public role!: Role
  public reviews!: Review[]
  public orders!: Order[]

  constructor(user: IUser) {
    this.fillEntity(user);
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(10);
    this.passwordHash = await hash(password, salt);

    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(user: IUser) {
    this.id = user.id
    this.userId = user.id;
    this.name = user.name;
    this.email = user.email;
    this.passwordHash = user.passwordHash
  }
}
