const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      Recipe = require('../models/recipe');

class RecipesRepository {

  getRecipes(query, callback) {
    console.log('*** RecipesRepo.getRecipes');
    Recipe.count((err, recipeCount) => {
      var count = recipeCount;
      console.log(`Recipes count: ${count}`);

      Recipe.find(query, (err, recipes) => {
        if (err) {
          console.log(`*** RecipesRepo.getRecipes error: ${err}`);
          return callback(err);
        }
        callback(null, {
          count: count,
          recipes: recipes
        });
      });
    });
  }

  getRecipe(id, callback) {
    console.log('*** RecipesRepo.getRecipe');
    Recipe.findById(id, (err, recipe) => {
      if (err) {
        console.log(`*** RecipesRepo.getRecipe error: ${err}`);
        return callback(err);
      }
      callback(null, recipe);
    });
  }

  insertRecipe(body, callback) {
    console.log('*** RecipesRepo.insertRecipe');
    var recipe = new Recipe();
    console.log(body);
    recipe.name = body.name;
    recipe.category = body.category;
    recipe.ingredients = body.ingredients;
    recipe.directions = body.directions;

    recipe.save((err, recipe) => {
      if (err) {
        console.log(`*** RecipesRepo insertRecipe error: ${err}`);
        return callback(err);
      }
      callback(null, recipe);
    });
  }

  updateRecipe(id, body, callback) {
    console.log('*** RecipesRepo.updateRecipe');
    Recipe.findById(id, (err, recipe) => {
      if (err) {
        console.log(`*** RecipesRepo.updateRecipe error: ${err}`);
        return callback(err);
      }
      recipe.name = body.name || recipe.name;
      recipe.category = body.category || recipe.category;
      recipe.ingredients = body.ingredients || recipe.ingredients;
      recipe.directions = body.directions || recipe.directions;

      recipe.save((err, recipe) => {
        if (err) {
          console.log(`*** RecipesRepo.updateRecipe error: ${err}`);
          return callback(err, null);
        }
        callback(null, recipe);
      });
    });
  }

  deleteRecipe(id, callback) {
    console.log('*** RecipesRepo.deleteRecipe');
    Recipe.remove({ '_id': id }, (err, recipe) => {
      if (err) {
        console.log(`*** RecipesRepo.deleteRecipe error: ${err}`);
        return callback(err, null);
      }
      callback(null, recipe);
    });
  }
}

module.exports = new RecipesRepository();
