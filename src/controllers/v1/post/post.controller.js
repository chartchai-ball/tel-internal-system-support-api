import { HttpMethod, route } from '@spksoft/koa-decorator'
import viewPost from '../../../domains/post/list'
import createPost from '../../../domains/post/create'
import multiPart from '../../../middlewares/multipart.middleware'
import { permissionCustomer } from '../../../middlewares/index'
import verifytokne from '../../../middlewares/verifytoken'
@route('/v1/post')
export default class systemController {
  @route('/list/:id', HttpMethod.GET, verifytokne)
  async view(ctx) {
    const paramTicketId = ctx.params.id
    const { token } = ctx.request
    const respData = await viewPost(paramTicketId, token)
    ctx.body = {
      status: true,
      data: respData,
    }
  }

  @route('/create', HttpMethod.POST, multiPart, verifytokne, permissionCustomer)
  async create(ctx) {
    const { body, files, token } = ctx.request
    const respData = await createPost(body, files, token)
    ctx.body = {
      status: true,
      data: respData,
    }
  }
}
