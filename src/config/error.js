export default class badRequestError extends Error {
  constructor(message, code = 'Bad_Request', status = 400) {
    super(message)
    this.name = 'BadRequestError'
    this.status = status
    this.code = code
  }
}
