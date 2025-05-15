import type { HttpContext } from '@adonisjs/core/http'
import { storeLoginValidation } from '#validators/auth'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  async login({ request, response }: HttpContext) {
    try {
      const data = request.body()
      const payload = await storeLoginValidation.validate(data)
      const user = await User.findBy('email', payload.email)
      if (user) {
        if (await hash.verify(String(user.password), payload.password)) {
          const auth = await User.accessTokens.create(user, ['*'], {
            name: user.email,
            expiresIn: 3600,
          })
          return response.status(200).json({
            message: 'Berhasil masuk, anda akan dialihkan dalam 2 detik.',
            result: { user, auth },
          })
        } else
          return response.status(401).json({
            message: 'Nama Pengguna/Kata Sandi tidak tepat.',
          })
      } else {
        return response.status(401).json({ message: 'Nama Pengguna/Kata Sandi tidak tepat.' })
      }
    } catch (error) {
      return response.status(error.status).json(error)
    }
  }
}
