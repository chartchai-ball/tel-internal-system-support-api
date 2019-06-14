import { Op } from 'sequelize'
import userRepository from '../../models/user/user.repository'
import { generateJwtToken, comparePassword } from '../../utils/domain'

const validateFields = {
  username: true,
  password: true,
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

    const authLoginUser = await userRepository.findOne({
      where: {
        [Op.or]: [
          {
            username: body.username,
          },
          {
            email: body.username,
          },
        ],
      },
    })
    if (!authLoginUser) throw new Error('username or password is incorrect')
    if (authLoginUser) {
      const validPassword = await comparePassword(body.password, authLoginUser.password)
      if (validPassword) {
        const token = await generateJwtToken({
          username: authLoginUser.username,
          role: authLoginUser.roles,
        })
        return {
          token,
        }
      }
      throw new Error('username or password is incorrect')
    }
  } catch (error) {
    return error.message
  }
}
