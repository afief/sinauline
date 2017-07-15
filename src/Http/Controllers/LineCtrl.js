const _ = require('lodash')
const loader = require('../../Helpers/Loader')

module.exports = class LineCtrl {
  static async webhooks (ctx, next) {
    const { events } = ctx.request.body

    /* Loop Webhook Events */
    _.each(events, async (event, n) => {
      switch (event.type) {
        case 'follow':
          await loader('EventHandlers/Follow')(event)
          break
        case 'unfollow':
          await loader('EventHandlers/Unfollow')(event)
          break
        case 'message':
          await loader('EventHandlers/Message')(event)
          break
      }
    })

    await next()
  }
}
