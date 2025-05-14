import vine from '@vinejs/vine'

export const storeInstitutionValidation = vine.compile(
  vine.object({
    name: vine.string(),
    description: vine.string().optional(),
  })
)

export const updateInstitutionValidation = vine.compile(
  vine.object({
    name: vine.string(),
    description: vine.string().optional(),
  })
)
