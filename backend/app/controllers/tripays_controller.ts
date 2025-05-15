import type { HttpContext } from '@adonisjs/core/http'
import axios from 'axios'
import env from '#start/env'
import * as crypto from 'node:crypto'
import Invoice from '#models/invoice'
import Payment from '#models/payment'

export default class TripaysController {
  async instruction({ params, response }: HttpContext) {
    const { code } = params
    await axios
      .get(`${env.get('TRIPAY_ENDPOINT')}/payment/instruction?code=${code}`, {
        headers: {
          Authorization: 'Bearer ' + env.get('TRIPAY_APIKEY'),
        },
        validateStatus: function (status) {
          return status < 999 // ignore http error
        },
      })
      .then((resp) => {
        return response.status(200).json(resp.data)
      })
      .catch((err) => {
        return response.status(400).json(err)
      })
  }

  async channel({ response }: HttpContext) {
    await axios
      .get(`${env.get('TRIPAY_ENDPOINT')}/merchant/payment-channel`, {
        headers: {
          Authorization: 'Bearer ' + env.get('TRIPAY_APIKEY'),
        },
        validateStatus: function (status) {
          return status < 999
        },
      })
      .then((resp) => {
        return response.status(200).json(resp.data)
      })
      .catch((err) => {
        return response.status(400).json(err)
      })
  }

  async calculator({ params, response }: HttpContext) {
    const { code, amount } = params
    await axios
      .get(`${env.get('TRIPAY_ENDPOINT')}/merchant/fee-calculator?code=${code}&amount=${amount}`, {
        headers: {
          Authorization: 'Bearer ' + env.get('TRIPAY_APIKEY'),
        },
        validateStatus: function (status) {
          return status < 999
        },
      })
      .then((resp) => {
        return response.status(200).json(resp.data)
      })
      .catch((err) => {
        return response.status(400).json(err)
      })
  }

  async transactions({ response }: HttpContext) {
    await axios
      .get(`${env.get('TRIPAY_ENDPOINT')}/merchant/transactions/?page=1&per_page=50`, {
        headers: {
          Authorization: 'Bearer ' + env.get('TRIPAY_APIKEY'),
        },
        validateStatus: function (status) {
          return status < 999
        },
      })
      .then((resp) => {
        return response.status(200).json(resp.data)
      })
      .catch((err) => {
        return response.status(400).json(err)
      })
  }

  async createTransaction({ request, response }: HttpContext) {
    const data = request.body()
    const invoice = await Invoice.query().preload('student').where('id', data.invoiceId).first()
    const merchantRef = `INV-${invoice?.student.registerNumber}`
    // @ts-ignore
    const expiry = Math.floor(new Date() / 1000) + 7 * 24 * 60 * 60
    const signature = crypto
      .createHmac('sha256', String(env.get('TRIPAY_PRIVATEKEY')))
      .update(env.get('TRIPAY_MERCHANTCODE') + merchantRef + invoice?.amount)
      .digest('hex')
    const payload = {
      method: data.method,
      merchant_ref: merchantRef,
      amount: invoice?.amount,
      customer_name: invoice?.student.name,
      customer_email: invoice?.student.email,
      customer_phone: invoice?.student.phone,
      order_items: [
        {
          sku: 'PPDB2526',
          name: 'Biaya Pendaftaran Peserta Didik Baru TP 2025/2026',
          price: invoice?.amount,
          quantity: 1,
        },
      ],
      expired_time: expiry,
      signature: signature,
    }
    await axios
      .post(`${env.get('TRIPAY_ENDPOINT')}/transaction/create`, payload, {
        headers: {
          Authorization: 'Bearer ' + env.get('TRIPAY_APIKEY'),
        },
        validateStatus: function (status) {
          return status < 999
        },
      })
      .then(async (resp) => {
        const { reference } = resp.data.data
        await Payment.create({ invoiceId: data.invoiceId, reference: reference })
        return response.status(200).json(resp.data)
      })
      .catch((err) => {
        return response.status(400).json(err)
      })
  }

  async detailTransaction({ params, response }: HttpContext) {
    const { reference } = params
    await axios
      .get(`${env.get('TRIPAY_ENDPOINT')}/transaction/detail?reference=${reference}`, {
        headers: {
          Authorization: 'Bearer ' + env.get('TRIPAY_APIKEY'),
        },
        validateStatus: function (status) {
          return status < 999
        },
      })
      .then((resp) => {
        return response.status(200).json(resp.data)
      })
      .catch((err) => {
        return response.status(400).json(err)
      })
  }

  async callback({ request, response }: HttpContext) {
    const data = request.body()
    crypto
      .createHmac('sha256', String(env.get('TRIPAY_PRIVATEKEY')))
      .update(JSON.stringify(data))
      .digest('hex')
    switch (data.status) {
      case 'UNPAID':
        const unpaid = await Payment.query().where('reference', data.reference).first()
        const inv = await Invoice.findOrFail(unpaid?.invoiceId)
        inv.status = 'BELUM'
        await inv.save()
        break
      case 'PAID':
        const paid = await Payment.query().where('reference', data.reference).first()
        const invoice = await Invoice.findOrFail(paid?.invoiceId)
        invoice.status = 'LUNAS'
        await invoice.save()
        break
      default:
        const payment = await Payment.query().where('reference', data.reference).first()
        await payment?.delete()
    }
    return response.status(200).json({ success: true })
  }
}
