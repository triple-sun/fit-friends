import { Review } from "@prisma/client";

export interface IReview extends Partial<Review> {
  id?: number
  createdAt: Date
  clientId: number
  workoutId: number
  text: string
  rating: number
}
