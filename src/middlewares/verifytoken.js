import jwt from 'jsonwebtoken'
import UserRepository from '../models/user/user.repository'
import { UnauthorizedError } from '../libraries/error/index'

export default async (ctx, next) => {
  const {
    header: { authorization },
  } = ctx.request
  const token = authorization

  if (!authorization) throw new UnauthorizedError('You Do Not Have Token')
  const decoded = await jwt.verify(token, process.env.SECRETKEY)
  const verifyToken = await UserRepository.findOne({
    where: {
      id: decoded.id,
      roles: decoded.role,
    },
  })
  if (verifyToken) {
    ctx.request.token = verifyToken
    await next()
  } else {
    throw new UnauthorizedError('You Do Not Have Token')
  }
}
