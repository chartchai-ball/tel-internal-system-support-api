// import ticketRepository from '../../models/ticket/ticket.repository'
import assestsTicketResository from '../../models/assetsimage/assetsTicket.Repository'
import postRepository from '../../models/post/post.Repository'
import { renameAssets } from '../../utils/domain'
import { BadRequestError } from '../../libraries/error/index'

const validateFields = {
  comment: true,
  ticketId: true,
}
export default async (body, files, token) => {
  try {
    const valid = Object.keys(body).filter(field => validateFields[field])
    if (valid.length !== Object.keys(validateFields).length)
      throw new BadRequestError(
        `Not valid fields: ${Object.keys(validateFields).map(
          field => (valid.includes(field) ? '' : field),
        )}`,
      )
    const createpost = await postRepository.create({
      comment: body.comment,
      ticketId: body.ticketId,
      userId: token.id,
    })
    const arrayFile = Object.values(files)
    const MapDataFile = arrayFile.flatten().map(val => ({
      name: val.name,
      path: val.path,
      postId: createpost.id,
    }))
    await renameAssets(MapDataFile)
    await assestsTicketResository.bulkCreate(MapDataFile)
    return 'Post complate'
  } catch (error) {
    throw error
  }
}
