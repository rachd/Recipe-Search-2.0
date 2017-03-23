const express = require('express');
const router = express.Router();

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

// Get all posts
router.get('/posts', (req, res) => {
  var couchbase = require('couchbase');
  var myCluster = new couchbase.Cluster('couchbase://localhost');
  var myBucket = myCluster.openBucket('recipes');
  myBucket.insert('recipe1', {name:'recipe1'}, function(err, res) {
    console.log('Success!');
  });
});

module.exports = router;