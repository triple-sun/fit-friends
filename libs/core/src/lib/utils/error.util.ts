import { NotFoundException } from "@nestjs/common"
import { IMessageProps } from "../interfaces/error-props.interface"
import { capitalize } from "./common.util"

export const getNotFoundMessage = (
({entity, property}: IMessageProps) => ((
    value?: string | number,
    args?: IMessageProps
  ) => (`
    ${capitalize(entity  || args?.entity
      ? `${entity ?? args?.entity} with`
      : ''
    )}
    ${(property || args?.property)
      ? ` ${property ?? args?.property}:`
      : ''
    } value ${
        value ?? args?.value
    } not found.
  `))
)

export const getExistsMessage = (
({entity, property}: IMessageProps) => ((
    value: string | number,
    args?: IMessageProps
  ) => (`${capitalize(entity ?? args?.entity ?? '')} ${property || args?.property ? `with ${property ?? args?.property}` : ''} ${value ?? args?.value} already exists.`))
)

export const getInvalidMessage = (
({entity: service, property}: IMessageProps) => ((
    args?: IMessageProps
  ) => (`
    ${args?.value} is not valid
    ${property || args?.property
      ? ` for property ${property ?? args?.property}`
      : ''}
    ${service ? ` of ${service}` : '.'}
  `))
)

export const getENVErrorMessage = (
  {value, targetName, property}: IMessageProps
) => `${targetName} ${property.toLowerCase().replace(/_/g, " ")} is required. Current value: ${value}`

export const getLengthErrorMessage = ({property, constraints, value}: IMessageProps) => {
  if (!constraints) {
    throw new NotFoundException(`${property} constraints are undefined`)
  }

  return `${property} length must be ${
    constraints[1]
      ? `no more than ${constraints[1]}`
      : ''
  } ${
    constraints[0] && constraints[1]
      ? 'and'
      : ''
  } ${
    constraints[0]
      ? `no less than ${constraints[0]}`
      : ''
  } symbols. Provided ${property} ${value} is ${value.length} symbols long.`
}
