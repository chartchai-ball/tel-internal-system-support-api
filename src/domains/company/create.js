import companyRepository from '../../models/company/company.Repository'
import { BadRequestError } from '../../libraries/error/index'

const validateFields = {
  company: true,
}
export default async body => {
  const valid = Object.keys(body).filter(field => validateFields[field])
  if (valid.length !== Object.keys(validateFields).length)
    throw new BadRequestError(
      `Not valid fields: ${Object.keys(validateFields).map(
        field => (valid.includes(field) ? '' : field),
      )}`,
    )
  try {
    const newArray = Object.values(body)
    const mapData = newArray
      .map(val =>
        val.map(values => ({
          subject: values,
        })),
      )
      .flatten()
    const companyCreate = await companyRepository.bulkCreate(mapData, {
      individualHooks: true,
    })
    if (companyCreate.length === 0) {
      throw new BadRequestError('Field companyRepository empty')
    }
    return 'Create complate'
  } catch (error) {
    throw error
  }
}
