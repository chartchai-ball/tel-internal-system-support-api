import UserRepository from '../../models/user/user.repository'
import { BadRequestError } from '../../libraries/error/index'

export default async (paramsUser, body) => {
  try {
    const findUser = await UserRepository.findOne({
      where: {
        id: paramsUser,
      },
    })
    if (!findUser) throw new BadRequestError('User not found')
    await UserRepository.update(
      {
        roles: body.roles,
      },
      {
        where: {
          id: paramsUser,
        },
      },
    )
    return 'updata complate'
  } catch (error) {
    throw error
  }
}
