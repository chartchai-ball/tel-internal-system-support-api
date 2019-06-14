import ticketRepository from '../../models/ticket/ticket.repository'
import { BadRequestError } from '../../libraries/error/index'
// import userRepository from '../../models/user/user.repository'

export default async token => {
  try {
    const getCustomerTicket = await ticketRepository.findAll({
      where: {
        userId: token.id,
      },
    })
    if (getCustomerTicket.length === 0) throw new BadRequestError(`Not found ticketID: ${token.id}`)
    else {
      return getCustomerTicket
    }
  } catch (error) {
    return error.message
  }
}
