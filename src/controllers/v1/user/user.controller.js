import { HttpMethod, route } from '@spksoft/koa-decorator'
// import verifyToken from '../../../middlewares/verifytoken'
import userList from '../../../domains/user/list'
import createUser from '../../../domains/user/register'
import getView from '../../../domains/user/view'
import userAppoved from '../../../domains/user/userapproved'
import userDelete from '../../../domains/user/delete'
import userUpdate from '../../../domains/user/update'
import permissionUser from '../../../middlewares/permisson-user'
import { permissionCustomer, verifyToken } from '../../../middlewares/index'
@route('/v1/users')
export default class userController {
  @route('/list', HttpMethod.GET, verifyToken, permissionUser)
  async getUser(ctx) {
    const { token } = ctx.request
    const respData = await userList(token)
    ctx.body = {
      status: true,
      data: respData,
    }
  }

  @route('/register', HttpMethod.POST)
  async register(ctx) {
    const { body } = ctx.request
    const respData = await createUser(body)
    ctx.body = {
      status: true,
      data: respData,
    }
  }

  @route('/view/', HttpMethod.GET, verifyToken, permissionCustomer)
  async view(ctx) {
    const { token } = ctx.request
    const respData = await getView(token)
    ctx.body = {
      status: true,
      data: respData,
    }
  }

  @route('/approve/:id', HttpMethod.PATCH, verifyToken, permissionUser)
  async approve(ctx) {
    const paramsUser = ctx.params.id
    const { body } = ctx.request
    const respData = await userAppoved(paramsUser, body)
    ctx.body = {
      status: true,
      data: respData,
    }
  }

  @route('/delete/:id', HttpMethod.DELETE)
  async delete(ctx) {
    const paramsUser = ctx.params.id
    const respData = await userDelete(paramsUser)
    ctx.body = {
      status: true,
      data: respData,
    }
  }

  @route('/update/:id', HttpMethod.PATCH)
  async update(ctx) {
    const paramsUser = ctx.params.id
    const { body } = ctx.request
    const respData = await userUpdate(paramsUser, body)
    ctx.body = {
      status: true,
      data: respData,
    }
  }
}
