const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const IngredientSchema = new Schema({
  ingredient: { type: String, require: true, trim: true },
  quantity: { type: String, required: true, trim: true }
});

const DirectionSchema = new Schema({
  direction: { type: String, required: true, trim: true }
})

const RecipeSchema = new Schema({
  name : { type: String, required: true, trim: true },
  category : { type: String, required: true, trim: true },
  ingredients: [ IngredientSchema ],
  directions: [ DirectionSchema ]
});


module.exports = mongoose.model('Recipe', RecipeSchema, 'recipes');
