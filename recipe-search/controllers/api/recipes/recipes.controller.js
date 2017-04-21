const recipesRepo = require('../../../lib/recipesRepository');

class RecipesController {
    constructor(router) {
        router.get('/', this.getRecipes.bind(this));
        router.post('/', this.insertRecipe.bind(this));
    }

    getRecipes(req, res) {
        console.log('*** getRecipes');

        recipesRepo.getRecipes((err, data) => {
            if (err) {
                console.log(`*** getRecipes error: ${err}`);
                res.json({
                    recipes: null
                });
            } else {
                console.log('*** getRecipes ok');
                res.json(data);
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
                console.log('*** getRecipe ok');
                res.json(recipe);
            }
        });
    }

    insertRecipe(req, res) {
        console.log('*** insertRecipe');
        recipesRepo.insertRecipe(req.body, (err, recipe) => {
            if (err) {
                console.log(`*** recipesRepo.insertRecipe error: ${err}`);
                res.json({status: false, error: 'Insert failed', recipe: null});
            } else {
                console.log('*** insertRecipe ok');
                res.json({ status: true, error: null, recipe: recipe });
            }
        });
    }
}

module.exports = RecipesController;