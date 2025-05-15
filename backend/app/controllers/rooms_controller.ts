import type { HttpContext } from '@adonisjs/core/http'
import Room from '#models/room'
import { storeRoomValidation, updateRoomValidation } from '#validators/room'

export default class RoomsController {
  async index({ response }: HttpContext) {
    try {
      const rooms = await Room.all()
      return response.status(200).json({
        result: rooms,
      })
    } catch (error) {
      return response.status(400).json(error)
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.body()
      const payload = await storeRoomValidation.validate(data)
      const room = await Room.create(payload)
      return response.status(200).json({
        message: 'Successfully created room',
        result: room,
      })
    } catch (error) {
      return response.status(400).json(error)
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const room = await Room.findOrFail(params.id)
      return response.status(200).json({
        result: room,
      })
    } catch (error) {
      return response.status(400).json(error)
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const data = request.body()
      const payload = await updateRoomValidation.validate(data)
      const room = await Room.findOrFail(params.id)
      const update = await room.merge(payload).save()
      return response.status(200).json({
        message: `Successfully updated room`,
        result: update,
      })
    } catch (error) {
      return response.status(400).json(error)
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const room = await Room.findOrFail(params.id)
      await room.delete()
      return response.status(200).json({
        message: 'Room deleted successfully.',
        result: room,
      })
    } catch (error) {
      return response.status(400).json(error)
    }
  }
}
