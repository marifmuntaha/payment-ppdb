import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { storeUserValidation, updateUserValidation } from '#validators/user'

export default class UsersController {
  async index({ response }: HttpContext) {
    try {
      const users = await User.all()
      return response.status(200).json({ result: users })
    } catch (error) {
      return response.status(400).json(error)
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.body()
      const payload = await storeUserValidation.validate(data)
      const user = await User.create(payload)
      return response.status(200).json({
        message: 'Data pengguna berhasil ditambahkan.',
        result: user,
      })
    } catch (error) {
      return response.status(400).json(error)
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const user = await User.findOrFail(params.id)
      return response.status(200).json({
        result: user,
      })
    } catch (error) {
      return response.status(400).json(error)
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const data = request.body()
      const user = await User.findOrFail(params.id)
      const payload = await request.validateUsing(updateUserValidation, {
        meta: {
          userId: params.id,
        },
        data: data,
      })
      const update = await user.merge(payload).save()
      return response.status(200).json({
        message: 'Data pengguna berhasil di perbarui.',
        result: update,
      })
    } catch (error) {
      return response.status(400).json(error)
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const user = await User.findOrFail(params.id)
      await user.delete()
      return response.status(200).json({
        message: 'Data pengguna berhasil di hapus.',
        result: user,
      })
    } catch (error) {
      return response.status(400).json(error)
    }
  }
}
