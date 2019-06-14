import customerRepository from '../../models/customer/customer.repository'
import { generateJwtToken, comparePassword } from '../../utils/domain'

const validateFields = {
  email: true,
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
    const authlogin = await customerRepository.findOne({
      where: {
        email: body.email,
      },
    })
    if (!authlogin) throw new Error('email is incorrect')

    const validPassword = await comparePassword(body.password, authlogin.password)
    if (validPassword) {
      const token = await generateJwtToken({
        email: authlogin.email,
        name: authlogin.name,
      })
      return {
        token,
      }
    }
    throw new Error('password is incorrect')
  } catch (error) {
    const { message } = error
    throw message
  }
}
