// import ticketRepository from '../../models/ticket/ticket.repository'
import postRepository from '../../models/post/post.Repository'
// import customerRepository from '../../models/customer/customer.repository'
import userRepository from '../../models/user/user.repository'

export default async (paramTicketId, token) => {
  try {
    const listPost = await userRepository.findAll({
      raw: true,
      attributes: ['name'],
      include: [
        {
          where: {
            ticketId: paramTicketId,
          },
          model: postRepository,
          attributes: ['createdAt', 'comment', 'id'],
        },
      ],
    })
    const mapData = listPost.map(val => ({
      id: val['posts.id'],
      name: val.name,
      comment: val['posts.comment'],
      createdAt: val['posts.createdAt'],
    }))
    const filterData = listPost.filter(data => data.userId === token.id)
    if (
      filterData ||
      token.roles === 'admin' ||
      token.roles === 'superadmin' ||
      token.roles === 'develop'
    ) {
      return mapData
    }

    if (filterData.length === 0) {
      throw new Error('Error')
    }

    // return test
  } catch (error) {
    throw error
  }
}
