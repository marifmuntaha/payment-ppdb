import vine from '@vinejs/vine'

export const storeLoginValidation = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string(),
  })
)
