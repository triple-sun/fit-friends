import { Gender, Location, Role, Skill, WorkoutType } from '@prisma/client';
import { genSalt, hash, compare } from 'bcrypt';
import { IEntity } from '../interfaces/entity.interface';
import { IUser } from '../interfaces/user.interface';
import { IReview } from '../interfaces/review.interface';
import { IOrder } from '../interfaces/order.interface';


export class UserEntity implements IEntity<IUser> {
  public id?: number
  public userId?: number;
  public skill!: Skill;
  public about!: string | null
  public birth!: Date;
  public workoutTypes!: WorkoutType[];
  public gender!: Gender;
  public email!: string;
  public name!: string;
  public password?: string;
  public passwordHash!: string;
  public role!: Role
  public reviews!: IReview[]
  public orders!: IOrder[]
  public location!: Location;
  public avatarUrl!: string | null
  public bgUrl!: string;

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
  }
}
