import { faker } from "@faker-js/faker";
import { ApiPropertyOptions } from "@nestjs/swagger"
import { Size } from "../consts/size.const"
import { Entity, PropType } from "../enums/utils.enum"
import { TApiPropArgs } from "../types/api-prop.type";
import { Payment, Role, Time, WorkoutType } from "@prisma/client";
import { Property, SizeProperty } from "../enums/property.enum";

const { Num, Str, Comm } = PropType


x

export const getCommonApiExamples = () => {
  const role = faker.helpers.enumValue(Role);

  return {
  [Property.Id]: faker.number.int({min: 1, max: 5}),
  [Property.Email]: faker.internet.email(),
  [Property.Payment]: faker.helpers.enumValue(Payment),
  [Property.Role]: role,
  [Property.WorkoutType]: faker.helpers.enumValue(WorkoutType),
  [Property.WorkoutTime]: faker.helpers.enumValue(Time),
  [Property.AvatarUrl]: `/fit-friends/markup/img/content/avatars/${role === Role.Client ? 'users' : 'coaches'}/photo-${faker.number.int({min: 1, max: role === Role.Client ? 5 : 1})}.png`,
  [Property.CreatedAt]: new Date,
  [Property.Page]: 1,
}}

export const getStrApiExamples = () => ({
  [SizeProperty.ReviewText]: faker.string.alpha(getPropSize(SizeProperty.ReviewText)),
  [SizeProperty.Password]: faker.string.alphanumeric(getPropSize(SizeProperty.Password)),
  [SizeProperty.Name]: faker.person.firstName(),
  [SizeProperty.Desc]: faker.string.alpha(getPropSize(SizeProperty.Desc)),
  [SizeProperty.Merits]: faker.string.alpha(getPropSize(SizeProperty.Desc)),
})

export const getNumApiExamples = () => {
  const rating = getPropSize(SizeProperty.Rating)
  const count = getPropSize(SizeProperty.Count)
  const price = faker.number.int(10000)

  return {
    [SizeProperty.Rating]: rating,
    [SizeProperty.Count]:count,
    [SizeProperty.Price]: price,
    totalPrice: count * price,
    totalRating: faker.number.int({min: rating, max: 5}),
}}

export const ApiExamples = {
  [Comm]: getCommonApiExamples(),
  [Num]: getNumApiExamples(),
  [Str]: getStrApiExamples()
}
