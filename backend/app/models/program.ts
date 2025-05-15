import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import Institution from '#models/institution'
import type { HasOne } from '@adonisjs/lucid/types/relations'

export default class Program extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare institutionId: number

  @column()
  declare code: string

  @column()
  declare name: string

  @column()
  declare description: string | undefined

  @hasOne(() => Institution, {
    foreignKey: 'id',
    localKey: 'institutionId',
  })
  declare institution: HasOne<typeof Institution>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
