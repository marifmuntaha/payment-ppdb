import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

export const storeStudentValidation = vine.compile(
  vine.object({
    institutionId: vine.number(),
    registerNumber: vine.string().unique(async (db, value) => {
      const student = await db.from('students').where('register_number', value).first()
      return !student
    }),
    nik: vine.string().unique(async (db, value) => {
      const student = await db.from('students').where('nik', value).first()
      return !student
    }),
    name: vine.string(),
    phone: vine.string(),
    email: vine.string().email(),
    gender: vine.string(),
    birthPlace: vine.string(),
    birthDay: vine
      .date({
        formats: 'YYYY-MM-DD',
      })
      .transform((date) => DateTime.fromJSDate(date)),
    address: vine.string(),
    fatherName: vine.string(),
    motherName: vine.string(),
    program: vine.number(),
    boarding: vine.string(),
    room: vine.number().optional(),
    cupboard: vine.string().optional(),
    book: vine.string().optional(),
  })
)

export const updateStudentValidation = vine.compile(
  vine.object({
    institutionId: vine.number(),
    registerNumber: vine.string().unique(async (db, value, field) => {
      const student = await db
        .from('students')
        .where('register_number', value)
        .whereNot('id', field.meta.studentId)
        .first()
      return !student
    }),
    nik: vine.string().unique(async (db, value, field) => {
      const student = await db
        .from('students')
        .where('nik', value)
        .whereNot('id', field.meta.studentId)
        .first()
      return !student
    }),
    name: vine.string(),
    phone: vine.string(),
    email: vine.string().email(),
    gender: vine.string(),
    birthPlace: vine.string(),
    birthDay: vine
      .date({
        formats: 'YYYY-MM-DD',
      })
      .transform((date) => DateTime.fromJSDate(date)),
    address: vine.string(),
    fatherName: vine.string(),
    motherName: vine.string(),
    program: vine.number(),
    boarding: vine.string(),
    room: vine.number().optional(),
    cupboard: vine.string().optional(),
    book: vine.string().optional(),
  })
)
