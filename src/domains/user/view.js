import UserRepository from '../../models/user/user.repository'
import { BadRequestError } from '../../libraries/error/index'

export default async token => {
  try {
    const getUserInfo = await UserRepository.findOne({
      where: {
        id: token.id,
      },
      attributes: ['id', 'username', 'name', 'position', 'email', 'phone', 'roles'],
    })
    if (!getUserInfo) throw new BadRequestError('user not found')
    else {
      return getUserInfo
    }
  } catch (error) {
    throw error
  }
}
