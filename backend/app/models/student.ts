import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Student extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare institutionId: number

  @column()
  declare registerNumber: string

  @column()
  declare nik: string

  @column()
  declare name: string

  @column()
  declare phone: string

  @column()
  declare email: string

  @column()
  declare gender: string

  @column()
  declare birthPlace: string

  @column.date()
  declare birthDay: DateTime

  @column()
  declare address: string

  @column()
  declare fatherName: string

  @column()
  declare motherName: string

  @column()
  declare program: number

  @column()
  declare boarding: string

  @column()
  declare room: number | undefined

  @column()
  declare cupboard: string | undefined

  @column()
  declare booking: string | undefined

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
