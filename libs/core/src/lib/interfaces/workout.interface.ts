import { Workout } from "@prisma/client"
import { IReview } from "./review.interface"

export interface IWorkout extends Workout {
  reviews: IReview[]
}
