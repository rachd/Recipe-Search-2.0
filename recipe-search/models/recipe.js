const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    name    : { type: String, required: true, trim: true }
});

module.exports = mongoose.model('Recipe', RecipeSchema);