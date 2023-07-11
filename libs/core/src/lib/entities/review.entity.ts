import { IEntity } from '../interfaces/entity.interface';
import { IReview } from '../interfaces/review.interface';

export class ReviewEntity implements IEntity<IReview> {
  public id!: number
  public createdAt!: Date
  public clientId!: number
  public workoutId!: number
  public text!: string
  public rating!: number

  constructor(review: IReview) {
    this.fillEntity(review);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(review: IReview) {
    this.id = review.id
    this.createdAt = review.createdAt
    this.clientId = review.clientId
    this.workoutId = review.clientId
    this.text = review.text
    this.rating = review.rating
  }
}
