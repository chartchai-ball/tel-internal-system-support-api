import path from 'path'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import compress from 'koa-compress'
import cors from '@koa/cors'
import { load } from '@spksoft/koa-decorator'
import gracefulShutdown from 'http-graceful-shutdown'
import { logger } from 'koa2-winston'
import serve from 'koa-static'
import config from './config'
import SocketServer from './libraries/socket'
import { NotFoundError, ErrorCode } from './libraries/error'
import { errorHandler, errorMiddleware, responseFormatter } from './middlewares'

const app = new Koa()

app.use(
  serve('./public/images', {
    maxage: 5 * 60 * 1000,
  }),
)
// Plug "system middlewares"
app.use(logger())
app.use(
  bodyParser({
    jsonLimit: '20mb',
  }),
)

app.use(bodyParser())
// app.use(
//   bodyParser({
//     jsonLimit: '20mb',
//   }),
// )
app.use(bodyParser())
app.use(compress())
app.use(cors())
app.use(errorMiddleware())
app.use(responseFormatter())
app.on('error', errorHandler())
// load router
const apiRouter = load(path.resolve(__dirname, 'controllers'), '.controller.js')
app.use(apiRouter.routes())
app.use(
  apiRouter.allowedMethods({
    throw: true,
    notImplemented: () =>
      new NotFoundError(
        'The resquested uri does not match to any route tables',
        ErrorCode.URI_NOT_FOUND.CODE,
      ),
    methodNotAllowed: () =>
      new NotFoundError(
        'The resquested uri does not match to any route tables',
        ErrorCode.URI_NOT_FOUND.CODE,
      ),
  }),
)

const server = app.listen(config.system.port)
SocketServer(app) // connection socket server
logger(`starting server on port ${config.system.port}`)
gracefulShutdown(server)
