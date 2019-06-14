import ticketRepository from '../../models/ticket/ticket.repository'
import { BadRequestError } from '../../libraries/error/index'

export default async (body, updateParams) => {
  try {
    const findticketid = await ticketRepository.findOne({
      where: {
        id: updateParams,
      },
    })
    if (!findticketid) throw new BadRequestError(`Not found TicketID: ${updateParams}`)
    else {
      await ticketRepository.update(body, {
        where: {
          id: updateParams,
        },
      })
      return 'update Success'
    }
  } catch (error) {
    return error.message
  }
}
