import type { HttpContext } from '@adonisjs/core/http'
import Invoice from '#models/invoice'
import { storeInvoiceValidation, updateInvoiceValidation } from '#validators/invoice'

export default class InvoicesController {
  async index({ response }: HttpContext) {
    try {
      const invoices = await Invoice.all()
      return response.status(200).json({
        result: invoices,
      })
    } catch (error) {
      return response.status(400).json(error)
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.body()
      const payload = await storeInvoiceValidation.validate(data)
      const invoice = await Invoice.create(payload)
      return response.status(200).json({
        message: 'Invoice created successfully.',
        result: invoice,
      })
    } catch (error) {
      return response.status(400).json(error)
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const invoice = await Invoice.findOrFail(params.id)
      return response.status(200).json({
        result: invoice,
      })
    } catch (error) {
      return response.status(400).json(error)
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const data = request.body()
      const payload = await updateInvoiceValidation.validate(data)
      const invoice = await Invoice.findOrFail(params.id)
      const update = await invoice.merge(payload).save()
      return response.status(200).json({
        message: 'Invoice updated successfully.',
        result: update,
      })
    } catch (error) {
      return response.status(400).json(error)
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const invoice = await Invoice.findOrFail(params.id)
      await invoice.delete()
      return response.status(200).json({
        message: 'Invoice destroyed successfully.',
        result: invoice,
      })
    } catch (error) {
      return response.status(400).json(error)
    }
  }
}
