import fs from 'fs'
import ticketRepository from '../../models/ticket/ticket.repository'
import { renameAssets } from '../../utils/domain'
import assetsTicketRepository from '../../models/assetsimage/assetsTicket.Repository'
import { BadRequestError } from '../../libraries/error/index'

const validateFields = {
  // company: true,
  // name: true,
  // email: true,
  subject: true,
  message: true,
  priority: true,
}

export default async (body, files, token) => {
  const fileKeys = Object.values(files)
  const MapRemoveFile = fileKeys.flatten().map(val => ({
    path: val.path,
  }))
  try {
    const valid = Object.keys(body).filter(field => validateFields[field])
    if (valid.length !== Object.keys(validateFields).length) {
      await MapRemoveFile.forEach(file => {
        fs.unlinkSync(file.path)
      })
      throw new BadRequestError(
        `Not valid fields ${Object.keys(validateFields).map(
          field => (valid.includes(field) ? '' : field),
        )}`,
      )
    } else {
      const newData = {
        ...body,
        userId: token.id,
      }
      const createTicket = await ticketRepository.create(newData)
      const { dataValues } = createTicket
      const getPath = fileKeys
        .map(val => {
          let newAssests = val
          if (val.length > 1) {
            newAssests = val.map(img => ({
              name: img.name,
              path: img.path,
              ticketId: dataValues.id,
            }))
          } else {
            newAssests = [val].map(img => ({
              name: img.name,
              path: img.path,
              ticketId: dataValues.id,
            }))
          }
          return newAssests
        })
        .flatten()

      await renameAssets(getPath)
      await assetsTicketRepository.bulkCreate(getPath, {
        individualHooks: true,
      })
      return 'Ticket Send Complate'
    }
  } catch (error) {
    throw error
  }
}
