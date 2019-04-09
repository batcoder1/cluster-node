const user = require('./user')

module.exports = function (router) {
  router.use('/user', user)

}
