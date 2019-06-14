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
    const { dataValues } = findUser
    const oldData = dataValues
    const newData = {
      ...body,
      roles: oldData.roles,
      username: oldData.username,
      password: oldData.password,
    }
    await UserRepository.update(newData, {
      where: {
        id: paramsUser,
      },
    })
    return 'edit complate'
  } catch (error) {
    throw error
  }
}
