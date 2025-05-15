import vine from '@vinejs/vine'

export const storePaymentValidation = vine.compile(
  vine.object({
    invoiceId: vine.number(),
    reference: vine.string(),
  })
)

export const updatePaymentValidation = vine.compile(
  vine.object({
    invoiceId: vine.number(),
    reference: vine.string(),
  })
)
