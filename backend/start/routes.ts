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
const InstitutionsController = () => import('#controllers/institutions_controller')
const TripaysController = () => import('#controllers/tripays_controller')
const UsersController = () => import('#controllers/users_controller')

router.get('/', async () => {
  return {
    hello: 'API Payment Yayasan Darul Hikmah Menganti',
  }
})

router.get('/instruction/:code', [TripaysController, 'instruction'])
router.get('/channel', [TripaysController, 'channel'])
router.get('/calculator/:code/:amount', [TripaysController, 'calculator'])
router.get('/transactions', [TripaysController, 'transactions'])
router.post('/create', [TripaysController, 'createTransaction'])
router.get('/transaction/:reference/detail', [TripaysController, 'detailTransaction'])
router.post('/callback', [TripaysController, 'callback'])

router
  .group(() => {
    router
      .group(() => {
        router.resource('user', UsersController).apiOnly()
      })
      .use(middleware.auth())
    router.resource('institution', InstitutionsController).apiOnly()
  })
  .prefix('api')
