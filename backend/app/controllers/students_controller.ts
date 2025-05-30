import type { HttpContext } from '@adonisjs/core/http'
import Student from '#models/student'
import { storeStudentValidation, updateStudentValidation } from '#validators/student'

export default class StudentsController {
  async index({ response }: HttpContext) {
    try {
      const students = await Student.all()
      return response.status(200).json({
        result: students,
      })
    } catch (error) {
      return response.status(400).json(error)
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.body()
      const payload = await storeStudentValidation.validate(data)
      const student = await Student.create(payload)
      return response.status(200).json({
        message: 'Student created',
        result: student,
      })
    } catch (error) {
      return response.status(400).json(error)
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const student = await Student.findOrFail(params.id)
      return response.status(200).json({
        result: student,
      })
    } catch (error) {
      return response.status(400).json(error)
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const data = request.body()
      const student = await Student.findOrFail(params.id)
      const payload = await request.validateUsing(updateStudentValidation, {
        meta: {
          studentId: params.id,
        },
        data: data,
      })
      const update = await student.merge(payload).save()
      return response.status(200).json({
        message: 'Updated successfully',
        result: update,
      })
    } catch (error) {
      return response.status(400).json(error)
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const student = await Student.findOrFail(params.id)
      await student.delete()
      return response.status(200).json({
        message: 'Student deleted',
        result: student,
      })
    } catch (error) {
      return response.status(400).json(error)
    }
  }
}
