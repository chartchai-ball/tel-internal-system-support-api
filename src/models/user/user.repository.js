import Sequelize from 'sequelize'
import sequelize from '../../libraries/database/client/sequelize'
import postRepository from '../post/post.Repository'
import ticketRepository from '../ticket/ticket.repository'

const schema = {
  name: Sequelize.STRING,
  username: {
    type: Sequelize.STRING,
    unique: true,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    required: true,
  },
  company: {
    type: Sequelize.STRING,
  },
  phone: Sequelize.STRING,
  position: Sequelize.STRING,
  roles: {
    type: Sequelize.ENUM,
    values: ['admin', 'superadmin', 'user', 'developer', 'customer'],
  },
  deletedAt: {
    type: Sequelize.DATE,
  },
}

const userRepository = sequelize.define('user', schema, {
  paranoid: true,
})

userRepository.hasMany(ticketRepository)
userRepository.hasMany(postRepository)

export default userRepository
