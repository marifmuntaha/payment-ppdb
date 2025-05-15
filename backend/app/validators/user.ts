import vine from '@vinejs/vine'

export const storeUserValidation = vine.compile(
  vine.object({
    institutionId: vine.number().optional(),
    fullName: vine.string(),
    email: vine
      .string()
      .email()
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      }),
    password: vine.string().confirmed(),
    phone: vine.string(),
    role: vine.string(),
  })
)

export const updateUserValidation = vine.compile(
  vine.object({
    institutionId: vine.number().optional(),
    fullName: vine.string(),
    email: vine
      .string()
      .email()
      .unique(async (db, value, field) => {
        const user = await db
          .from('users')
          .where('email', value)
          .whereNot('id', field.meta.userId)
          .first()
        return !user
      }),
    password: vine.string().confirmed(),
    phone: vine.string(),
    role: vine.string(),
  })
)
