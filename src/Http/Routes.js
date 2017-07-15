module.exports = function (router) {
  router.get('/', (ctx, next) => {
    ctx.json({ version: '0.1', timestamp: (new Date()).getTime() })
  })
}
