import Sequelize from 'sequelize'
import sequelize from '../../libraries/database/client/sequelize'
import assetsTicketRepository from '../assetsimage/assetsTicket.Repository'
import postRepository from '../post/post.Repository'

const schema = {
  subject: Sequelize.STRING,
  message: Sequelize.STRING,
  priority: {
    type: Sequelize.ENUM,
    values: ['high', 'normal', 'low'],
  },
  deletedAt: {
    type: Sequelize.DATE,
  },
  status: {
    type: Sequelize.ENUM,
    values: ['inprogress', 'done', 'pending'],
    defaultValue: 'pending',
  },
  closing: {
    type: Sequelize.STRING,
  },
  carer: {
    type: Sequelize.STRING,
  },
}

const ticketRepository = sequelize.define('ticket', schema, {
  paranoid: true,
})

ticketRepository.hasMany(assetsTicketRepository)
ticketRepository.hasMany(postRepository)

export default ticketRepository
