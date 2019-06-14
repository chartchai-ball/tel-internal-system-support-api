// import Sequelize from 'sequelize'
// import sequelize from '../../libraries/database/client/sequelize'
// import postRepository from '../post/post.Repository'
// import ticketRepository from '../ticket/ticket.repository'

// const schema = {
//   name: Sequelize.STRING,
//   company: {
//     type: Sequelize.STRING,
//   },
//   username: {
//     type: Sequelize.STRING,
//     unique: true,
//   },
//   email: {
//     type: Sequelize.STRING,
//     unique: true,
//   },
//   password: Sequelize.STRING,
//   phone: Sequelize.STRING,
//   deletedAt: {
//     type: Sequelize.DATE,
//   },
// }

// const customerRepository = sequelize.define('customer', schema, {
//   paranoid: true,
// })

// customerRepository.hasMany(postRepository)
// customerRepository.hasMany(ticketRepository)
// export default customerRepository
