import Sequelize from 'sequelize'
import sequelize from '../../libraries/database/client/sequelize'
import assetsticketRepository from '../assetsimage/assetsTicket.Repository'

const schema = {
  comment: {
    type: Sequelize.STRING,
  },
  deletedAt: {
    type: Sequelize.DATE,
  },
}
const postRepository = sequelize.define('post', schema, {
  paranoid: true,
})
postRepository.hasMany(assetsticketRepository)
export default postRepository
