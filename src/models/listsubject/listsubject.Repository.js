import Sequelize from 'sequelize'
import sequelize from '../../libraries/database/client/sequelize'
// import ticketRepository from '../ticket/ticket.repository'

const schema = {
  subject: {
    type: Sequelize.STRING,
  },
  deletedAt: {
    type: Sequelize.DATE,
  },
}
const listSubjectRepository = sequelize.define('listsubject', schema, {
  paranoid: true,
})
export default listSubjectRepository
