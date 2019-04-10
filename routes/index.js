const user = require('./user')

module.exports = function (router) {
  router.use('/users', user)

}
