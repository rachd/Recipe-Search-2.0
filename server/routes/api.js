const RecipeModel = require("../models/recipemodel");
const appRouter = function(app) {
  
  app.post("/api/save", function(req, res) {
    if(!req.body.title) {
      return res.status(400).send({"status": "error", "message": "A title is required"});
    } else if (!req.body.ingredients) {
      return res.status(400).send({"status": "error", "message": "Ingredients are required"});
    } else if (!req.body.favorite) {
      return res.status(400).send({"status": "error", "message": "Favorite is required"});
    }
    RecipeModel.save(req.body, function(error, result) {
      if(error) {
        return res.status(400).send(error);
      }
      res.send(result);
    });
  });

  app.get("api/get", function(req, res) {
    if(!req.query.document_id) {
      return res.status(400).send({"status": "error", "message": "A document id is required"});
    }
    RecipeModel.getDocumentById(req.query.document_id, function(error, result) {
      if(error) {
        return res.status(400).send(error);
      }
      res.send(result);
    });
  });

  app.post("/api/delete", function(req, res) {
    if(!req.query.document_id) {
      return res.status(400).send({"status": "error", "message": "A document id is required"});
    }
    RecipeModel.delete(req.query.document_id, function(error, result) {
      if(error) {
        return res.status(400).send(error);
      }
      res.send(result);
    });
  });

  app.get("/api/getAll", function(req, res) {
    RecipeModel.getAll(function(error, result) {
      if (error) {
        return res.status(400).send(error);
      }
      res.send(result);
    });
  });
  
};

module.exports = appRouter;


// const express = require('express');
// const router = express.Router();

// /* GET api listing. */
// router.get('/', (req, res) => {
//   res.send('api works');
// });

// // Get all posts
// router.get('/posts', (req, res) => {
//   var couchbase = require('couchbase');
//   var myCluster = new couchbase.Cluster('couchbase://localhost');
//   var myBucket = myCluster.openBucket('recipes');

//   //get all recipes
//   myBucket.get('recipe1', function(err, res) {
//     console.log('Value: ', res.value);
//   });
// });

// module.exports = router;