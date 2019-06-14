import Sequelize from 'sequelize'
import sequelize from '../../libraries/database/client/sequelize'

const schema = {
  name: {
    type: Sequelize.STRING,
  },
  deletedAt: {
    type: Sequelize.DATE,
  },
}

const assetsticketRepository = sequelize.define('assetsTicket', schema, {
  paranoid: true,
})

export default assetsticketRepository
