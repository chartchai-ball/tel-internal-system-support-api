import listSubjectRepository from '../../models/listsubject/listsubject.Repository'
import { BadRequestError } from '../../libraries/error/index'

export default async paramsId => {
  try {
    const subjectDelete = await listSubjectRepository.destroy({
      where: {
        id: paramsId,
      },
    })
    if (subjectDelete === 0) throw new BadRequestError(`Not found Deleteing Id: ${paramsId}`)
    else {
      return 'Delete Success'
    }
  } catch (error) {
    throw error
  }
}
