import companyRepository from '../../models/company/company.Repository'
import { BadRequestError } from '../../libraries/error/index'

export default async paramsId => {
  try {
    const companyDelete = await companyRepository.destroy({
      where: {
        id: paramsId,
      },
    })
    if (companyDelete === 0) throw new BadRequestError(`Not found Deleteing Id: ${paramsId}`)
    else {
      return 'Delete Success'
    }
  } catch (error) {
    throw error
  }
}
