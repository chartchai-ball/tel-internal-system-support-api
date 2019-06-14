import companyRepository from '../../models/company/company.Repository'

export default async () => {
  try {
    const companyList = await companyRepository.findAll({
      attributes: ['subject', 'id'],
    })
    return companyList
  } catch (error) {
    throw error
  }
}
