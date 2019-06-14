import Sequelize from 'sequelize'
import sequelize from '../../libraries/database/client/sequelize'
// import ticketRepository from '../ticket/ticket.repository'

const schema = {
  company: {
    type: Sequelize.STRING,
  },
  deletedAt: {
    type: Sequelize.DATE,
  },
}
const companyRepository = sequelize.define('company', schema, {
  paranoid: true,
})
export default companyRepository
