import listSubjectRepository from '../../models/listsubject/listsubject.Repository'
import { BadRequestError } from '../../libraries/error/index'

const validateFields = {
  subject: true,
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
    const createListSubject = await listSubjectRepository.bulkCreate(mapData, {
      individualHooks: true,
    })
    if (createListSubject.length === 0) {
      throw new BadRequestError('Field subject empty')
    }
    return 'Create complate'
  } catch (error) {
    throw error
  }
}
