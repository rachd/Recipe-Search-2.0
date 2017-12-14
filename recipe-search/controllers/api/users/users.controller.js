const usersRepo = require('../../../lib/usersRepository');

class UsersController {
  constructor(router) {
    router.get('/:id', this.getUser.bind(this));
    router.post('/', this.insertUser.bind(this));
    router.put('/:id', this.updateUser.bind(this));
    router.delete('/:id', this.deleteUser.bind(this));
  }

  getUser(req, res) {
    console.log('*** getUser');
    const id = req.params.id;
    console.log(id);

    usersRepo.getUser(id, (err, user) => {
      if (err) {
        console.log(`*** getUser error: ${err}`);
        res.json(null);
      } else {
        console.log('*** getUser okay');
        res.json(user);
      }
    });
  }

  insertUser(req, res) {
    console.log('*** insertUser');
    usersRepo.insertUser(req.body, (err, user) => {
      if (err) {
        console.log(`*** insertUser error: ${err}`);
        res.json({status: false, error: 'Insert failed', user: null});
      } else {
        console.log('*** insertUser okay');
        res.json({ status: true, error: null, user: user });
      }
    });
  }

  updateUser(req, res) {
    console.log('*** updateUser');
    console.log('*** req.body');
    console.log(req.body);

    if (!req.body) {
      throw new Error('User required');
    }

    usersRepo.updateUser(req.params.id, req.body, (err, user) => {
      if (err) {
        console.log(`*** updateUser error: ${err}`);
        res.json({ status: false, error: 'Update failed', user: null });
      } else {
        console.log('*** updateUser okay');
        res.json({ status: true, error: null, user: user });
      }
    });
  }

  deleteUser(req, res) {
    console.log('*** deleteUser');
    usersRepo.deleteUser(req.params.id, (err) => {
      if (err) {
        console.log(`*** deleteUser error: ${err}`);
        res.json({ status: false });
      } else {
        console.log('*** deleteUser okay');
        res.json({ status: true });
      }
    });
  }
}

module.exports = UsersController;
