const recipesRepo = require('../../../lib/recipesRepository');

class RecipesController {
  constructor(router) {
    router.get('/', this.getRecipes.bind(this));
    router.get('/:id', this.getRecipe.bind(this));
    router.post('/', this.insertRecipe.bind(this));
    router.put('/:id', this.updateRecipe.bind(this));
    router.delete('/:id', this.deleteRecipe.bind(this));
  }

  getRecipes(req, res) {
    console.log('*** getRecipes');
    recipesRepo.getRecipes((err, data) => {
      if (err) {
        console.log(`*** getRecipes error: ${err}`);
        res.json(null);
      } else {
        console.log('*** getRecipes okay');
        res.json(data.recipes);
      }
    });
  }

  getRecipe(req, res) {
    console.log('*** getRecipe');
    const id = req.params.id;
    console.log(id);

    recipesRepo.getRecipe(id, (err, recipe) => {
      if (err) {
        console.log(`*** getRecipe error: ${err}`);
        res.json(null);
      } else {
        console.log('*** getRecipe okay');
        res.json(recipe);
      }
    });
  }

  insertRecipe(req, res) {
    console.log('*** insertRecipe');
    recipesRepo.insertRecipe(req.body, (err, recipe) => {
      if (err) {
        console.log(`*** insertRecipe error: ${err}`);
        res.json({status: false, error: 'Insert failed', recipe: null});
      } else {
        console.log('*** insertRecipe okay');
        res.json({ status: true, error: null, recipe: recipe });
      }
    });
  }

  updateRecipe(req, res) {
    console.log('*** updateRecipe');
    console.log('*** req.body');
    console.log(req.body);

    if (!req.body) {
      throw new Error('Recipe required');
    }

    recipesRepo.updateRecipe(req.params.id, req.body, (err, recipe) => {
      if (err) {
        console.log(`*** updateRecipe error: ${err}`);
        res.json({ status: false, error: 'Update failed', recipe: null });
      } else {
        console.log('*** updateRecipe okay');
        res.json({ status: true, error: null, recipe: recipe });
      }
    });
  }

  deleteRecipe(req, res) {
    console.log('*** deleteRecipe');
    recipesRepo.deleteRecipe(req.params.id, (err) => {
      if (err) {
        console.log(`*** deleteRecipe error: ${err}`);
        res.json({ status: false });
      } else {
        console.log('*** deleteRecipe okay');
        res.json({ status: true });
      }
    });
  }
}

module.exports = RecipesController;
