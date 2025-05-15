import type { HttpContext } from '@adonisjs/core/http'
import Payment from '#models/payment'
import { storePaymentValidation, updatePaymentValidation } from '#validators/payment'

export default class PaymentsController {
  async index({ response }: HttpContext) {
    try {
      const payments = await Payment.all()
      return response.status(200).json({
        result: payments,
      })
    } catch (error) {
      console.log(error)
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.body()
      const payload = await storePaymentValidation.validate(data)
      const payment = await Payment.create(payload)
      return response.status(200).json({
        message: 'Payment created successfully.',
        result: payment,
      })
    } catch (error) {
      return response.status(400).json(error)
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const payment = await Payment.findOrFail(params.id)
      return response.status(200).json({
        result: payment,
      })
    } catch (error) {
      return response.status(400).json(error)
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const data = request.body()
      const payload = await updatePaymentValidation.validate(data)
      const payment = await Payment.findOrFail(params.id)
      const update = await payment.merge(payload).save()
      return response.status(200).json({
        message: 'Payment updated successfully.',
        result: update,
      })
    } catch (error) {
      return response.status(400).json(error)
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const payment = await Payment.findOrFail(params.id)
      await payment.delete()
      return response.status(200).json({
        message: 'Payment deleted successfully.',
        result: payment,
      })
    } catch (error) {
      return response.status(400).json(error)
    }
  }
}
