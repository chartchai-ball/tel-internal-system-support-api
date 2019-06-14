import { HttpMethod, route } from '@spksoft/koa-decorator'
import createCustomer from '../../../domains/customer/register'
import viewTicket from '../../../domains/customer/view'
import listTicket from '../../../domains/customer/list'
import { permissionCustomer } from '../../../middlewares/index'

@route('/v1/customer')
export default class customerController {
  @route('/register', HttpMethod.POST)
  async register(ctx) {
    const { body } = ctx.request
    const respData = await createCustomer(body)
    ctx.body = {
      status: true,
      data: respData,
    }
  }

  @route('/view/:id', HttpMethod.GET, permissionCustomer)
  async view(ctx) {
    const paramTicketId = ctx.params.id
    const { token } = ctx.request
    const respData = await viewTicket(paramTicketId, token)
    ctx.body = {
      status: true,
      data: respData,
    }
  }

  @route('/list', HttpMethod.GET, permissionCustomer)
  async list(ctx) {
    const { token } = ctx.request
    const respData = await listTicket(token)
    ctx.body = {
      status: true,
      data: respData,
    }
  }
}
