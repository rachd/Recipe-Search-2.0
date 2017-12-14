const mongoose = require('mongoose'),
      Scheme = mongoose.Schema,
      User = require('../models/user');

class UsersRepository {

  getUser(id, callback) {
    console.log('*** UsersRepo.getUser');
    User.findById(id, (err, user) => {
      if (err) {
        console.log(`*** UsersRepo.getUser error: ${err}`);
        return callback(err);
      }
      callback(null, user);
    });
  }

  insertUser(body, callback) {
    console.log('*** UsersRepo.insertUser');
    var user = new User();
    console.log(body);
    user.name = body.name;
    user.email = body.email;
    user.setPassword(body.password);

    user.save((err, user) => {
      if (err) {
        console.log(`*** UsersRepo insertUser error: ${err}`);
        return callback(err);
      }
      var token = user.generateJWT();
      callback(null, user);
    });
  }

  updateUser(id, body, callback) {
    console.log('*** UsersRepo.updateUser');
    User.findById(id, (err, user) => {
      if (err) {
        console.log(`*** UsersRepo.updateUser error: ${err}`);
        return callback(err);
      }
      user.name = body.name || user.name;
      user.email = body.email || user.email;
      user.hash = body.hash || user.hash;
      user.salt = body.salt || user.salt;

      user.save((err, user) => {
        if (err) {
          console.log(`*** UsersRepo.updateUser error: ${err}`);
          return callback(err, null);
        }
        callback(null, user);
      });
    });
  }

  deleteUser(id, callback) {
    console.log('*** UsersRepo.deleteUser');
    User.remove({ '_id': id }, (err, user) => {
      if (err) {
        console.log(`*** UsersRepo.deleteUser error: ${err}`);
        return callback(err, null);
      }
      callback(null, user);
    });
  }

}

module.exports = new UsersRepository();
