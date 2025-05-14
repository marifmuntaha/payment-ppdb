import type { HttpContext } from '@adonisjs/core/http'
import Institution from '#models/institution'
import { storeInstitutionValidation } from '#validators/institution'

export default class InstitutionsController {
  async index({ response }: HttpContext) {
    try {
      const institutions = await Institution.all()
      return response.status(200).json({
        result: institutions,
      })
    } catch (error) {
      return response.status(400).json(error)
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.body()
      const payload = await storeInstitutionValidation.validate(data)
      const institution = await Institution.create(payload)
      return response.status(200).json({
        message: 'Data Institusi berhasil di simpan.',
        result: institution,
      })
    } catch (error) {
      return response.status(400).json(error)
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const institution = await Institution.findOrFail(params.id)
      return response.status(200).json({
        result: institution,
      })
    } catch (error) {
      return response.status(400).json(error)
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const data = request.body()
      const payload = await storeInstitutionValidation.validate(data)
      const institution = await Institution.findOrFail(params.id)
      const update = await institution.merge(payload).save()
      return response.status(200).json({
        message: 'Data Institusi berhasil di perbarui.',
        result: update,
      })
    } catch (error) {
      return response.status(400).json(error)
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const institution = await Institution.findOrFail(params.id)
      await institution.delete()
      return response.status(200).json({
        message: 'Data Institusi berhasil di hapus.',
        result: institution,
      })
    } catch (error) {
      return response.status(400).json(error)
    }
  }
}
