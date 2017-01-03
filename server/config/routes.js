var usersController = require('./../controllers/users.js')

module.exports = function(app) {
  app.get('/', usersController.index);
  app.get('/users', usersController.getUsers);
  app.post('/register', usersController.register);
  app.post('/login', usersController.login);
  app.get('/users/:id', usersController.showUser);
  app.delete('/users/:id/delete', usersController.delete);
}//End Module Exports
