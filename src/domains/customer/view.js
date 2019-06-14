import ticketRepository from '../../models/ticket/ticket.repository'
import assetsTicketRepository from '../../models/assetsimage/assetsTicket.Repository'
import { BadRequestError, UnauthorizedError } from '../../libraries/error/index'

export default async (paramTicketId, token) => {
  try {
    const getAssetsTicket = await ticketRepository.findOne({
      where: {
        id: paramTicketId,
      },
      include: [
        {
          model: assetsTicketRepository,
        },
      ],
    })
    if (!getAssetsTicket) throw new BadRequestError(`Not found ticketID: ${paramTicketId}`)
    if (token.roles === 'admin' || token.roles === 'superadmin' || token.roles === 'developer') {
      return getAssetsTicket
    }
    if (token.id !== getAssetsTicket.userId) {
      throw new UnauthorizedError(`Not found ticket to you`)
    } else {
      return getAssetsTicket
    }
    // if (token.id !== getAssetsTicket.userId) throw new UnauthorizedError(`Not found ticket to you`)
    // else {
    //   return getAssetsTicket
    // }
  } catch (error) {
    throw error
  }
}
