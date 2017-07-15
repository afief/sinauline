const loader = require('../Helpers/Loader')

module.exports = function (router) {
  router.get(
    '/',
    loader('Controllers/IndexCtrl@index')
    )

  router.get(
    '/webhooks',
    loader('Controllers/LineCtrl@webhooks')
    )
}
