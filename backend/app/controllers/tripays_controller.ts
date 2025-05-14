import type { HttpContext } from '@adonisjs/core/http'
import axios from 'axios'
import env from '#start/env'
import * as crypto from 'node:crypto'

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
    // @ts-ignore
    const expiry = Math.floor(new Date() / 1000) + 24 * 60 * 60
    const signature = crypto
      .createHmac('sha256', String(env.get('TRIPAY_PRIVATEKEY')))
      .update(env.get('TRIPAY_MERCHANTCODE') + data.merchant_ref + data.amount)
      .digest('hex')
    const payload = {
      method: data.method,
      merchant_ref: data.merchant_ref,
      amount: data.amount,
      customer_name: data.customer_name,
      customer_email: data.customer_email,
      customer_phone: data.customer_phone,
      order_items: [
        {
          sku: 'PPDB2526',
          name: 'Biaya Pendaftaran Peserta Didik Baru TP 2025/2026',
          price: data.amount,
          quantity: 1,
          product_url: 'https://tokokamu.com/product/nama-produk-1',
          image_url: 'https://tokokamu.com/product/nama-produk-1.jpg',
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
      .then((resp) => {
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
    const signature = crypto
      .createHmac('sha256', String(env.get('TRIPAY_PRIVATEKEY')))
      .update(JSON.stringify(data))
      .digest('hex')
    console.log(signature)
    console.log(data)
    return response.status(200).json({ success: true })
  }
}
