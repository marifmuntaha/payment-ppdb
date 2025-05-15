import vine from '@vinejs/vine'

export const storeRoomValidation = vine.compile(
  vine.object({
    name: vine.string(),
    description: vine.string().optional(),
  })
)

export const updateRoomValidation = vine.compile(
  vine.object({
    name: vine.string(),
    description: vine.string().optional(),
  })
)
