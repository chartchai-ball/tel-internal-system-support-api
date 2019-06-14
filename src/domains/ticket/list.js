import { Op } from 'sequelize'
import ticketRepository from '../../models/ticket/ticket.repository'
import userRepository from '../../models/user/user.repository'

export default async token => {
  try {
    if (token.roles === 'admin' || token.roles === 'superadmin' || token.roles === 'developer') {
      const getListTicket = await userRepository.findAll({
        raw: true,
        include: [
          {
            model: ticketRepository,
          },
        ],
      })
      const filterData = getListTicket.filter(val => val['tickets.id'] !== null)
      const mapDataUserTicket = filterData.map(val => ({
        name: val.name,
        email: val.email,
        company: val.company,
        ticketId: val['tickets.id'],
        subject: val['tickets.subject'],
        status: val['tickets.status'],
        priority: val['tickets.priority'],
        carer: val['tickets.carer'],
        closing: val['tickets.closing'],
        createdAt: val['tickets.createdAt'],
        message: val['tickets.message'],
      }))
      return mapDataUserTicket
    }
    const getListTicket = await userRepository.findAll({
      raw: true,
      where: {
        roles: 'customer',
      },
      attributes: ['name', 'email', 'company'],
      include: [
        {
          where: {
            userId: token.id,
          },
          model: ticketRepository,
        },
      ],
    })
    const mapDataUserTicket = getListTicket.map(val => ({
      name: val.name,
      email: val.email,
      company: val.company,
      ticketId: val['tickets.id'],
      subject: val['tickets.subject'],
      status: val['tickets.status'],
      priority: val['tickets.priority'],
      carer: val['tickets.carer'],
      closing: val['tickets.closing'],
      createdAt: val['tickets.createdAt'],
      message: val['tickets.message'],
    }))
    return mapDataUserTicket
    // ticket -> userID  -> userProfile
  } catch (error) {
    throw error
  }
}
