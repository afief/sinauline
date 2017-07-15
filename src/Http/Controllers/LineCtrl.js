module.exports = class LineCtrl {
  static async webhooks (ctx, next) {
    ctx.json({webhooks: 'YES'})
    await next()
  }
}
