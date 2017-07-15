const loader = require('../Helpers/Loader')

module.exports = function (router) {
  router.get(
    '/',
    loader('Controllers/IndexCtrl@index')
    )

  router.post(
    '/webhooks',
    loader('Middlewares/AsyncReturn')(1000),
    loader('Controllers/LineCtrl@webhooks')
    )
}
