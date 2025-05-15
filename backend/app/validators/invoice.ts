import vine from '@vinejs/vine'

export const storeInvoiceValidation = vine.compile(
  vine.object({
    studentId: vine.number(),
    description: vine.string(),
    amount: vine.number(),
    status: vine.string(),
  })
)

export const updateInvoiceValidation = vine.compile(
  vine.object({
    studentId: vine.number(),
    description: vine.string(),
    amount: vine.number(),
    status: vine.string(),
  })
)
