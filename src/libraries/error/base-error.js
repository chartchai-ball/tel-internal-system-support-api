class BaseError extends Error {
  constructor(message) {
    super(message)
    this.name = this.constructor.name
    this.message = message
  }
}

export default BaseError
