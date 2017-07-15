const Koa = require('koa')
const qs = require('koa-qs')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const koaStatic = require('koa-static')
const path = require('path')

const routes = require('./Http/Routes.js')

module.exports = class Core {
  constructor () {
    const router = new Router()
    this.app = new Koa()
    qs(this.app, 'first')

    this.app.use(bodyParser())

    this.app.use(this.json)
    this.app.use(this.error)

    routes(router)
    this.app.use(router.routes())
    .use(router.allowedMethods({ throw: true }))

    this.app.on('error', (err) => {
      console.log('Uncaught exception', err.message)
    })

    this.app.use(koaStatic(path.join(__dirname, '/../frontends/build')), {
      defer: true,
      index: 'index.html'
    })
  }

  async json (ctx, next) {
    ctx.json = (payload, status = 200) => {
      ctx.type = 'application/json'
      ctx.status = status
      ctx.body = payload
    }
    ctx.success = (payload) => {
      ctx.json({
        err: 0,
        data: payload
      }, 200)
    }
    ctx.failed = (message, status = 400, detail = {}) => {
      ctx.json({
        err: status,
        message: message,
        detail
      }, status)
    }
    await next()
  }

  async error (ctx, next) {
    try {
      await next()
    } catch (error) {
      if (error.name === 'HttpError') {
        ctx.json(error.json(), error.code)
      } else {
        const code = 500
        const { message } = error
        ctx.json({ code, message }, error.code)
      }

      if (process.env.NODE_ENV === 'development') {
        console.log(error.stack)
      }
    }
  }

  listen (port, fn) {
    this.app.listen(port, (err) => {
      if (fn) {
        return fn(err)
      }
      console.log(err || `I\`m Alive! \n~> ${port}`)
    })
  }
}
