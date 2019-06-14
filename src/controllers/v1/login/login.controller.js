import { HttpMethod, route } from '@spksoft/koa-decorator'
import userAndCustomerLogin from '../../../domains/login/login'

@route('/v1/login')
export default class loginController {
  @route('/', HttpMethod.get)
  async userAndCustomerLogin(ctx) {
    const { body } = ctx.request
    const respData = await userAndCustomerLogin(body)
    ctx.body = {
      status: true,
      data: respData,
    }
  }
}
