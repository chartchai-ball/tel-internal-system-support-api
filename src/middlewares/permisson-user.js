import { UnauthorizedError } from '../libraries/error/index'

export default async (ctx, next) => {
  const { token } = ctx.request
  if (token.roles === 'superadmin' || token.roles === 'developer') {
    await next()
  } else {
    throw new UnauthorizedError('You Do Not Have Permission')
  }
}
