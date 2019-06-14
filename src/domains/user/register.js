import UserRepository from '../../models/user/user.repository'
import { hashPassword, generateJwtToken } from '../../utils/domain'
import { BadRequestError } from '../../libraries/error/index'

const validateFields = {
  name: true,
  username: true,
  email: true,
  password: true,
  phone: true,
}

export default async body => {
  try {
    const valid = Object.keys(body).filter(field => validateFields[field])
    if (valid.length !== Object.keys(validateFields).length)
      throw new BadRequestError(
        `Not valid fields: ${Object.keys(validateFields).map(
          field => (valid.includes(field) ? '' : field),
        )}`,
      )
    const findUsername = await UserRepository.findOne({
      where: {
        username: body.username,
      },
    })

    const findUserEmail = await UserRepository.findOne({
      where: {
        email: body.email,
      },
    })
    if (findUsername && findUserEmail) throw new BadRequestError('username and email existing !')
    if (findUsername) {
      throw new BadRequestError('Username  existing !')
    } else if (findUserEmail) {
      throw new BadRequestError('email existing !')
    }

    const userHashPassword = await hashPassword(body.password)
    const newData = {
      ...body,
      password: userHashPassword,
      roles: 'user',
      company: 'True e-Logistics',
    }
    const newUser = await UserRepository.create(newData)
    const token = generateJwtToken({
      id: newUser.id,
      roles: newUser.roles,
    })
    return token
  } catch (error) {
    throw error
  }
}
