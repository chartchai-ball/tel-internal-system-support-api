import ticketRepository from '../../models/ticket/ticket.repository'
import { BadRequestError } from '../../libraries/error/index'

export default async (body, paramTicketId, token) => {
  try {
    const findStatusTicket = await ticketRepository.findOne({
      where: {
        id: paramTicketId,
      },
    })
    if (!findStatusTicket) throw new BadRequestError(`Not found TicketID: ${paramTicketId}`)
    if (body.status === 'inprogress') {
      await ticketRepository.update(
        {
          status: body.status,
          carer: token.id,
        },
        {
          where: {
            id: paramTicketId,
          },
        },
      )
      return 'updata Status Success'
    }
    if (body.status === 'done') {
      await ticketRepository.update(
        {
          status: body.status,
          closing: token.id,
        },
        {
          where: {
            id: paramTicketId,
          },
        },
      )
      return 'Ticket Done'
    }
  } catch (error) {
    throw error
  }
}
