import { HttpMethod, route } from '@spksoft/koa-decorator'
import createTicket from '../../../domains/ticket/create'
import viewTicket from '../../../domains/ticket/view'
import multiPart from '../../../middlewares/multipart.middleware'
import getList from '../../../domains/ticket/list'
import deleteTicket from '../../../domains/ticket/delete'
import updateTicket from '../../../domains/ticket/update'
import updateStatus from '../../../domains/ticket/updateStatus'
import importExcel from '../../../domains/ticket/importexcel'
import updateListSubject from '../../../domains/listsubject/update'
// import permissionUser from '../../../middlewares/permisson-user'
import { permissionCustomer, verifyToken, permissonAdmin } from '../../../middlewares/index'
import createListSubject from '../../../domains/listsubject/create'
import listSubject from '../../../domains/listsubject/list'
import deleteListSubject from '../../../domains/listsubject/delete'
@route('/v1/ticket')
export default class ticketController {
  @route('/create', HttpMethod.POST, multiPart, verifyToken, permissionCustomer)
  async create(ctx) {
    const { body, token, files } = ctx.request
    const respData = await createTicket(body, files, token)
    ctx.body = {
      status: true,
      data: respData,
    }
  }

  @route('/view/:id', HttpMethod.GET, verifyToken, permissionCustomer)
  async view(ctx) {
    const paramTicketId = ctx.params.id
    const { token } = ctx.request
    const respData = await viewTicket(paramTicketId, token)
    ctx.body = {
      status: true,
      data: respData,
    }
  }

  @route('/list', HttpMethod.GET, verifyToken, permissionCustomer)
  async list(ctx) {
    const { token } = ctx.request
    const respData = await getList(token)
    ctx.body = {
      status: true,
      data: respData,
    }
  }

  @route('/delete/:id', HttpMethod.DELETE)
  async delete(ctx) {
    const paramId = ctx.params.id
    const respData = await deleteTicket(paramId)
    ctx.body = {
      status: true,
      data: respData,
    }
  }

  @route('/update/:id', HttpMethod.PATCH)
  async update(ctx) {
    const { body } = ctx.request
    const updateParams = ctx.params.id
    const respData = await updateTicket(body, updateParams)
    ctx.body = {
      status: true,
      data: respData,
    }
  }

  @route('/updatestatus/:id', HttpMethod.PATCH, verifyToken, permissionCustomer)
  async status(ctx) {
    const { body, token } = ctx.request
    const paramTicketId = ctx.params.id
    const respData = await updateStatus(body, paramTicketId, token)
    ctx.body = {
      status: true,
      data: respData,
    }
  }

  @route('/import/', HttpMethod.POST, multiPart)
  async import(ctx) {
    const respData = await importExcel(ctx)
    ctx.body = {
      status: true,
      data: respData,
    }
  }

  @route('/create/subject', HttpMethod.POST, verifyToken, permissonAdmin)
  async createSubject(ctx) {
    const { body } = ctx.request
    const respData = await createListSubject(body)
    ctx.body = {
      status: true,
      data: respData,
    }
  }

  @route('/list/subject', HttpMethod.GET, verifyToken, permissionCustomer)
  async listSubject(ctx) {
    const respData = await listSubject()
    ctx.body = {
      status: true,
      data: respData,
    }
  }

  @route('/update/subject/:id', HttpMethod.PUT, verifyToken, permissonAdmin)
  async updataSubject(ctx) {
    const paramId = ctx.params.id
    const { body } = ctx.request
    const respData = await updateListSubject(paramId, body)
    ctx.body = {
      status: true,
      data: respData,
    }
  }

  @route('/delete/subject/:id', HttpMethod.DELETE, verifyToken, permissonAdmin)
  async deleteSubject(ctx) {
    const paramId = ctx.params.id
    const respData = await deleteListSubject(paramId)
    ctx.body = {
      status: true,
      data: respData,
    }
  }
}
