import { HttpMethod, route } from '@spksoft/koa-decorator'
import { permissionCustomer, verifyToken, permissonAdmin } from '../../../middlewares/index'
import createCompany from '../../../domains/company/create'
import listCompany from '../../../domains/company/list'
import updateCompany from '../../../domains/company/update'
import deleteCompany from '../../../domains/company/delete'
@route('/v1/company')
export default class companyController {
  @route('/create', HttpMethod.GET)
  async create(ctx) {
    const { body } = ctx.request
    const respData = await createCompany(body)
    ctx.body = {
      status: true,
      data: respData,
    }
  }

  @route('/list/', HttpMethod.GET, verifyToken, permissionCustomer)
  async list(ctx) {
    const respData = await listCompany()
    ctx.body = {
      status: true,
      data: respData,
    }
  }

  @route('/update/:id', HttpMethod.PUT, verifyToken, permissonAdmin)
  async update(ctx) {
    const paramId = ctx.params.id
    const { body } = ctx.request
    const respData = await updateCompany(paramId, body)
    ctx.body = {
      status: true,
      data: respData,
    }
  }

  @route('/delete/:id', HttpMethod.DELETE, verifyToken, permissonAdmin)
  async delete(ctx) {
    const paramId = ctx.params.id
    const respData = await deleteCompany(paramId)
    ctx.body = {
      status: true,
      data: respData,
    }
  }
}
