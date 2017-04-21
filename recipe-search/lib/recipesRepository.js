const mongoose = require('mongoose'),
      Scheme = mongoose.Schema,
      Recipe = require('../models/recipe');

class RecipesRepository {
    getRecipes(callback) {
        console.log('*** RecipesRepository.getRecipes');
        Recipe.find({}, {}, { sort: { name: 1 } }, (err, recipes) => {
            if (err) {
                console.log(`*** RecipesRepository.getRecipes err: ${err}`);
                return callback(err);
            }
            callback(null, recipes);
        });
    }

    getRecipe(recipeId, callback) {
        console.log('*** RecipesRepository.getRecipe');
        Recipe.find({ 'id': recipeId }, {}, (err, recipe) => {
            if (err) {
                console.log(`*** RecipesRepository.getRecipes err: ${err}`);
                return callback(err);
            }
            callback(null, recipe);
        });
    }

    insertRecipe(body, callback) {
        console.log('*** RecipesRepository.insertRecipe');
        const recipe = new Recipe();
        console.log(body);

        recipe.name = body.name;

        recipe.save((err, recipe) => {
            if (err) {
                console.log(`*** RecipesRepository insertRecipe error: ${err}`);
                return callback(err, null);
            }

            callback(null, recipe);
        });
    }
}

module.exports = new RecipesRepository();