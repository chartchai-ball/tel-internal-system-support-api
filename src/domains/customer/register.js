import userRepository from '../../models/user/user.repository'
import { hashPassword, generateJwtToken } from '../../utils/domain'

const validateFields = {
  name: true,
  username: true,
  email: true,
  password: true,
  phone: true,
  company: true,
}

export default async body => {
  try {
    const valid = Object.keys(body).filter(field => validateFields[field])
    if (valid.length !== Object.keys(validateFields).length)
      throw new Error(
        `Not valid fields ${Object.keys(validateFields).map(
          field => (valid.includes(field) ? '' : field),
        )}`,
      )
    const findUsereMail = await userRepository.findOne({
      where: {
        email: body.email,
      },
    })
    if (findUsereMail) throw new Error('email existing')
    const userHashPassword = await hashPassword(body.password)
    const newData = {
      ...body,
      password: userHashPassword,
      roles: 'customer',
    }
    const newUser = await userRepository.create(newData)
    const token = generateJwtToken({
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
    })
    return token
  } catch (error) {
    return error.message
  }
}
