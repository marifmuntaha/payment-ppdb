import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'students'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('institution_id')
      table.string('register_number').notNullable()
      table.string('nik').notNullable().unique()
      table.string('name').notNullable()
      table.string('phone').notNullable()
      table.string('email').notNullable()
      table.enum('gender', ['L', 'K']).notNullable()
      table.string('birth_place').notNullable()
      table.dateTime('birth_day').notNullable()
      table.string('address').notNullable()
      table.string('father_name').notNullable()
      table.string('mother_name').notNullable()
      table.integer('program').notNullable()
      table.enum('boarding', ['1', '2']).notNullable().comment('1. Tahfidz, 2. Kitab')
      table.integer('room').nullable()
      table.enum('cupboard', ['1', '2']).nullable().comment('1. Sudah, 2. Belum').defaultTo('2')
      table.enum('book', ['1', '2']).nullable().comment('1. Sudah, 2. Belum').defaultTo('2')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
