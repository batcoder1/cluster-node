 
exports.getAllUsers = async (req, res) => {
  try {

    const users = [
      { id: 1, name: 'Ana'},
      { id: 2, name: 'Mario'},
      { id: 3, name: 'Luis'},
      { id: 4, name: 'Marta'},
      { id: 5, name: 'Alfredo'}

    ]
    res.send(users)
  } catch (err) {
    console.log('profile %s', err)
    return handler(err, res)
  }
}
 
function handler (err, res) {
  if (err) {
    return res.status(500).send({
      code: err
    })
  }
  return res.status(500).send({
    code: '500',
    message: 'Internal Server error'
  })
}
