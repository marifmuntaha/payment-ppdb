import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import Student from '#models/student'
import type { HasOne } from '@adonisjs/lucid/types/relations'

export default class Invoice extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare studentId: number

  @column()
  declare description: string

  @column()
  declare amount: number

  @column()
  declare status: string

  @hasOne(() => Student, {
    foreignKey: 'id',
    localKey: 'studentId',
  })
  declare student: HasOne<typeof Student>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
