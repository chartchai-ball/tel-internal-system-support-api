import listSubjectRepository from '../../models/listsubject/listsubject.Repository'

export default async () => {
  try {
    const createListSubject = await listSubjectRepository.findAll({
      attributes: ['subject', 'id'],
    })
    return createListSubject
  } catch (error) {
    throw error
  }
}
