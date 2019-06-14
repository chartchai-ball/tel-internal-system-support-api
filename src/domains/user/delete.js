import userRepository from '../../models/user/user.repository'
import { BadRequestError } from '../../libraries/error/index'

export default async softDelete => {
  try {
    const userDelete = await userRepository.destroy({
      where: {
        id: softDelete,
      },
    })
    if (userDelete === 0) throw new BadRequestError(`Not found Deleteing userId: ${softDelete}`)
    else {
      return 'Delete Success'
    }
  } catch (error) {
    throw error
  }
}
