import { Op } from 'sequelize'
import userRepository from '../../models/user/user.repository'
import { generateJwtToken, comparePassword } from '../../utils/domain'
import { BadRequestError } from '../../libraries/error/index'
// import badRequestError from '../../config/error'

const validateFields = {
  username: true,
  password: true,
}

export default async body => {
  try {
    const valid = Object.keys(body).filter(field => validateFields[field])
    if (valid.length !== Object.keys(validateFields).length)
      throw new Error(
        `Not valid fields : ${Object.keys(validateFields).map(
          field => (valid.includes(field) ? '' : field),
        )}`,
      )
    const authLogin = await userRepository.findOne({
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
    if (!authLogin) throw new BadRequestError('username or password is incorrect')
    if (authLogin) {
      const validPassword = await comparePassword(body.password, authLogin.password)
      if (validPassword) {
        const token = await generateJwtToken({
          id: authLogin.id,
          role: authLogin.roles,
        })
        return {
          token,
          id: authLogin.id,
          role: authLogin.roles,
        }
      }
      throw new BadRequestError('username or password is incorrect')
    }
  } catch (error) {
    throw error
  }
}
