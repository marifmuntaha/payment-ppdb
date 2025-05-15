import vine from '@vinejs/vine'

export const storeProgramValidation = vine.compile(
  vine.object({
    institutionId: vine.number(),
    code: vine.string(),
    name: vine.string(),
    description: vine.string().optional(),
  })
)

export const updateProgramValidation = vine.compile(
  vine.object({
    institutionId: vine.number(),
    code: vine.string(),
    name: vine.string(),
    description: vine.string().optional(),
  })
)
