import companyRepository from '../../models/company/company.Repository'
import { BadRequestError } from '../../libraries/error/index'

const validateFields = {
  company: true,
}
export default async (paramId, body) => {
  try {
    const valid = Object.keys(body).filter(field => validateFields[field])
    if (valid.length !== Object.keys(validateFields).length)
      throw new BadRequestError(
        `Not valid fields: ${Object.keys(validateFields).map(
          field => (valid.includes(field) ? '' : field),
        )}`,
      )
    const findId = await companyRepository.findOne({
      where: {
        id: paramId,
      },
    })
    if (!findId) throw new BadRequestError(` Not found id  ${paramId}`)
    else {
      await companyRepository.update(body, {
        where: {
          id: paramId,
        },
      })
      return 'Update Complate'
    }
  } catch (error) {
    throw error
  }
}
