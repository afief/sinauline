module.exports = class IndexCtrl {
  static async index (ctx, next) {
    ctx.json({
      version: '0.1',
      timestamp: (new Date()).getTime()
    })
    await next()
  }
}
