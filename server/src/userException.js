class UserException extends Error {
  constructor () {
    super(message)
  }
}
module.exports.UserException = UserException;