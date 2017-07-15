module.exports = (delay = 5000, prop = { success: true }) => {
  return async (ctx, next) => {
    ctx.json(prop)

    setTimeout(function () {
      next()
    }, delay)
  }
}
