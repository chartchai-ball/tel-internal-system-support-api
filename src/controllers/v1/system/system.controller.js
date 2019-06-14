import { HttpMethod, route } from '@spksoft/koa-decorator'
// import { io } from '../../../libraries/socket/index'

@route('/v1/system')
export default class systemController {
  @route('/health', HttpMethod.GET)
  async health(ctx) {
    ctx.body = {
      status: true,
      date: Date.now(),
    }
  }
}
