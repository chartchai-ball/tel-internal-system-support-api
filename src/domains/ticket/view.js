import ticketRepository from '../../models/ticket/ticket.repository'
import assetsTicketRepository from '../../models/assetsimage/assetsTicket.Repository'
import { BadRequestError, UnauthorizedError } from '../../libraries/error/index'
import userRepository from '../../models/user/user.repository'

export default async (paramTicketId, token) => {
  try {
    const getAssetsTicket = await ticketRepository.findOne({
      attributes: ['carer', 'id', 'closing', 'userId', 'status'],
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
    if (token.roles === 'customer') {
      if (token.id !== getAssetsTicket.userId)
        throw new UnauthorizedError(`Not found ticket authorized`)
    }
    if (getAssetsTicket.carer && getAssetsTicket.closing) {
      const findCarer = await userRepository.findOne({
        attributes: ['name'],
        where: {
          id: getAssetsTicket.carer,
        },
      })
      const findClosing = await userRepository.findOne({
        attributes: ['name'],
        where: {
          id: getAssetsTicket.closing,
        },
      })
      return {
        getAssetsTicket,
        findClosing,
        findCarer,
      }
    }
    if (getAssetsTicket.carer) {
      const findCarer = await userRepository.findOne({
        attributes: ['name'],
        where: {
          id: getAssetsTicket.carer,
        },
      })
      return {
        getAssetsTicket,
        findCarer,
        findClosing: {
          name: '',
        },
      }
    }
    if (getAssetsTicket.closing) {
      const findClosing = await userRepository.findOne({
        attributes: ['name'],
        where: {
          id: getAssetsTicket.closing,
        },
      })
      return {
        getAssetsTicket,
        findClosing,
        findCarer: {
          name: '',
        },
      }
    }
    if (!getAssetsTicket.carer) {
      return {
        getAssetsTicket,
        findCarer: {
          name: '',
        },
        findClosing: {
          name: '',
        },
      }
    }

    // if (!getAssetsTicket) throw new BadRequestError(`Not found ticketID: ${paramTicketId}`)
    // if (token.roles === 'admin' || token.roles === 'superadmin' || token.roles === 'developer') {
    //   return {
    //     getAssetsTicket,
    //   }
    // }
    // if (token.id !== getAssetsTicket.userId) {
    //   throw new UnauthorizedError(`Not found ticket authorized`)
    // } else {
    //   return {
    //     getAssetsTicket,
    //   }
    // }
  } catch (error) {
    throw error
  }
}
