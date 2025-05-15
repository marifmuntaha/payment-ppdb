import type { HttpContext } from '@adonisjs/core/http'
import Program from '#models/program'
import { storeProgramValidation, updateProgramValidation } from '#validators/program'

export default class ProgramsController {
  async index({ response }: HttpContext) {
    try {
      const programs = await Program.all()
      return response.status(200).json({
        result: programs,
      })
    } catch (error) {
      return response.status(400).json(error)
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.body()
      const payload = await storeProgramValidation.validate(data)
      const program = await Program.create(payload)
      return response.status(200).json({
        message: 'Program created',
        result: program,
      })
    } catch (error) {
      return response.status(400).json(error)
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const program = await Program.findOrFail(params.id)
      return response.status(200).json({
        result: program,
      })
    } catch (error) {
      return response.status(400).json(error)
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const data = request.body()
      const payload = await updateProgramValidation.validate(data)
      const program = await Program.findOrFail(params.id)
      const update = await program.merge(payload).save()
      return response.status(200).json({
        message: 'Program updated successfully.',
        result: update,
      })
    } catch (error) {
      return response.status(400).json(error)
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const program = await Program.findOrFail(params.id)
      await program.delete()
      return response.status(200).json({
        message: 'Program deleted successfully.',
        result: program,
      })
    } catch (error) {
      return response.status(400).json(error)
    }
  }
}
