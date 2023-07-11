import { Prefix } from "../enums/prefix.enum"
import { Entity } from "../enums/utils.enum"

export const getAppRunningMessage = (port: string | number) => `🚀 Fit Friends API is running on http://localhost:${port}/${Prefix.Global}. Swagger specification and interface: http://localhost:${port}/${Prefix.Spec}`

export const getRemovedMessage = (ent: Entity, id?: number) => `${ent} ${id ? `with id ${id}` : ''} was successfully removed`

export const getRemovedSchema = (ent: Entity, id?: number) => ({schema: { example: getRemovedMessage(ent, id), type: 'string', description: getRemovedMessage(ent) }})
