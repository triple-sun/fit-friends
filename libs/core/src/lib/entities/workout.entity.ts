import { Gender, Review, Skill, Time, WorkoutType } from '@prisma/client';
import { IEntity } from '../interfaces/entity.interface';
import { IWorkout } from '../interfaces/workout.interface';
import { IReview } from '../interfaces/review.interface';

export class WorkoutEntity implements IEntity<IWorkout> {
  public id!: number;
  public name!: string;
  public skill!: Skill;
  public type!: WorkoutType;
  public time!: Time;
  public price!: number;
  public kcal!: number;
  public gender!: Gender;
  public bgUrl!: string;
  public videoUrl!: string;
  public isPromo!: boolean;
  public rating!: number;
  public reviews!: IReview[]

  public coachId!: number;
  public orderIds!: []
  public reviewIds!: []

  constructor(workout: IWorkout) {
    this.fillEntity(workout);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(workout: IWorkout) {
    this.id = workout.id;
    this.name = workout.name;
    this.skill = workout.skill
    this.type = workout.type;
    this.time = workout.time
    this.price = workout.price
    this.kcal = workout.kcal
    this.gender = workout.gender
    this.bgUrl = workout.bgUrl
    this.videoUrl = workout.bgUrl
    this.isPromo = workout.isPromo
    this.rating = workout.reviews.reduce((total, next) => total + next.rating, 0) / workout.reviews.length

    this.coachId = workout.coachId
  }
}
