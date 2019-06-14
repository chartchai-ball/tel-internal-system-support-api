import listSubjectRepository from '../../models/listsubject/listsubject.Repository'
import { BadRequestError } from '../../libraries/error/index'

const validateFields = {
  subject: true,
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
    const findId = await listSubjectRepository.findOne({
      where: {
        id: paramId,
      },
    })
    if (!findId) throw new BadRequestError(` Not found id  ${paramId}`)
    else {
      await listSubjectRepository.update(body, {
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
