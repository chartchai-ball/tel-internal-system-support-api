import { Op } from 'sequelize'
import UserRepository from '../../models/user/user.repository'
import { BadRequestError } from '../../libraries/error/index'

export default async token => {
  try {
    if (token.roles === 'developer') {
      const listUser = await UserRepository.findAll({
        where: {
          roles: {
            [Op.notIn]: ['customer'],
          },
          id: {
            [Op.ne]: token.id,
          },
        },
      })
      return listUser
    }
    const listUser = await UserRepository.findAll({
      where: {
        roles: {
          [Op.notIn]: ['developer', 'customer'],
        },
        id: {
          [Op.ne]: token.id,
        },
      },
    })
    if (listUser.length === 0) throw new BadRequestError('user not found')
    return listUser
  } catch (error) {
    throw error
  }
}
