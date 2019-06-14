import ticketRepository from '../../models/ticket/ticket.repository'
import assetsTicketRepository from '../../models/assetsimage/assetsTicket.Repository'
import { BadRequestError } from '../../libraries/error/index'

export default async paramId => {
  try {
    const deleteTicket = await ticketRepository.destroy({
      where: {
        id: paramId,
      },
    })
    const deleteImage = await assetsTicketRepository.destroy({
      where: {
        ticketId: paramId,
      },
    })
    if (deleteTicket === 0 || deleteImage === 0)
      throw new BadRequestError(`Not found Deleteing TicketID: ${paramId}`)
    else {
      return 'Delete Success'
    }
  } catch (error) {
    throw error
  }
}
