import { ApiPropertyOptions } from "@nestjs/swagger"
import { Entity } from "../enums/utils.enum"
import { Property } from "../enums/property.enum"



export type TApiPropArgs = {
  ent: Entity,
  prop: Property,
  extra?: ApiPropertyOptions
}

type TExamples<T extends TProps, V extends number | string | Date | number[]> = Pick<Record<Property, V>, T>

export type TNumExamples = TExamples<TNumProps, number>

export interface ICommExamples extends TExamples<TCommProps, number | string | Date | number[] | StringCount | GuitarType> {
    [Id]: number
    [Email]: string
    [Type]: GuitarType,
    [Strings]: StringCount,
    [ItemIds]: number[],
    [ItemId]: number,
    [Photo]: string,
    [CreatedAt]: Date,
    [Page]: number,
}

export type TStrExamples = TExamples<TStrProps, string>

export type TApiExamples = ICommExamples | TNumExamples | TStrExamples
