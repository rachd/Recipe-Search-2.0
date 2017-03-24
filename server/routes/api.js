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

  //get all recipes
  myBucket.get('recipe1', function(err, res) {
    console.log('Value: ', res.value);
  });
});

module.exports = router;