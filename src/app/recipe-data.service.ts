import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Recipe } from './recipe';

@Injectable()
export class RecipeDataService {

  constructor(private http: Http) { }

  // Get all posts from the API
  getAllPosts() {
    return this.http.get('/api/posts')
      .map(res => res.json());
  }

  lastId: number = 0;

  // Placeholder for recipes's
  recipes: Recipe[] = [];

  // Simulate POST /recipes
  addRecipe(recipe: Recipe): RecipeDataService {
    if (!recipe.id) {
      recipe.id = ++this.lastId;
    }
    this.recipes.push(recipe);
    return this;
  }

  // Simulate DELETE /recipes/:id
  deleteRecipeById(id: number): RecipeDataService {
    this.recipes = this.recipes
      .filter(recipe => recipe.id !== id);
    return this;
  }

  // Simulate PUT /recipes/:id
  updateRecipeById(id: number, values: Object = {}): Recipe {
    let recipe = this.getRecipeById(id);
    if (!recipe) {
      return null;
    }
    Object.assign(recipe, values);
    return recipe;
  }

  // Simulate GET /recipes
  getAllRecipes(): Recipe[] {
    return this.recipes;
  }

  // Simulate GET /recipes/:id
  getRecipeById(id: number): Recipe {
    return this.recipes
      .filter(recipe => recipe.id === id)
      .pop();
  }

}