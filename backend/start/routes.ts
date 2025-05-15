/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const AuthController = () => import('#controllers/auth_controller')
const InstitutionsController = () => import('#controllers/institutions_controller')
const InvoicesController = () => import('#controllers/invoices_controller')
const PaymentsController = () => import('#controllers/payments_controller')
const ProgramsController = () => import('#controllers/programs_controller')
const RoomsController = () => import('#controllers/rooms_controller')
const StudentsController = () => import('#controllers/students_controller')
const TripaysController = () => import('#controllers/tripays_controller')
const UsersController = () => import('#controllers/users_controller')

router.get('/', async () => {
  return {
    message: 'API Payment Yayasan Darul Hikmah Menganti',
  }
})

router
  .group(() => {
    router
      .group(() => {
        router.post('login', [AuthController, 'login'])
      })
      .prefix('auth')
    router.post('/callback', [TripaysController, 'callback'])
    router
      .group(() => {
        router.resource('institution', InstitutionsController).apiOnly()
        router.resource('invoice', InvoicesController).apiOnly()
        router.resource('payment', PaymentsController).apiOnly()
        router.resource('program', ProgramsController).apiOnly()
        router.resource('room', RoomsController).apiOnly()
        router.resource('student', StudentsController).apiOnly()
        router
          .group(() => {
            router.get('/instruction/:code', [TripaysController, 'instruction'])
            router.get('/channel', [TripaysController, 'channel'])
            router.get('/calculator/:code/:amount', [TripaysController, 'calculator'])
            router.get('/transactions', [TripaysController, 'transactions'])
            router.post('/create', [TripaysController, 'createTransaction'])
            router.get('/transaction/:reference/detail', [TripaysController, 'detailTransaction'])
          })
          .prefix('tripay')
      })
      .use(middleware.auth())
    router.resource('user', UsersController).apiOnly()
  })
  .prefix('api')
