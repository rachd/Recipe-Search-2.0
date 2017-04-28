import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

//Grab everything with import 'rxjs/Rx';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/throw';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';

import { IRecipe } from '../shared/interfaces';

@Injectable()
export class DataService {

    baseUrl: string = '/api/recipes';

    recipes: [IRecipe] = [
      { name: "Lemon Bars",
        category: "Desserts",
        ingredients: [{ingredient: "flour", quantity: "1 1/2 cups + 3 tbsp"},
                      {ingredient: "butter", quantity: "3/4 cup"},
                      {ingredient: "lemons", quantity: "2"},
                      {ingredient: "eggs", quantity: "3"},
                      {ingredient: "sugar", quantity: "1 cup"},
                      {ingredient: "baking powder", quantity: "1/2 tsp"},
                      {ingredient: "salt", quantity: "1/2 tsp"}]
      },
      { name: "Sugar Cookies",
        category: "Desserts",
        ingredients: [{ingredient: "flour", quantity: "1 1/3 cups"},
                      {ingredient: "salt", quantity: "1/4 tsp"},
                      {ingredient: "butter", quantity: "1/2 cup"},
                      {ingredient: "eggs", quantity: "1"},
                      {ingredient: "vanilla extract", quantity: "1 tsp"}]
      },
      { name: "Challah",
        category: "Breads",
        ingredients: [{ingredient: "flour", quantity: "16 3/4 ounces (3 1/2 cups)"},
                      {ingredient: "warm water", quantity: "1/4 cup"},
                      {ingredient: "eggs", quantity: "4"},
                      {ingredient: "vegetable oil", quantity: "1/4 cup"},
                      {ingredient: "honey", quantity: "1/4 cup"},
                      {ingredient: "salt", quantity: "1 1/2 tsp"}]
      }
    ];

    constructor(private http: Http) {

    }

    getRecipes(): [IRecipe] {
      return this.recipes;
    }

    insertRecipe(recipe: IRecipe) {
      this.recipes.push(recipe);
    }

    getSingleRecipe(id: number) {
      return this.recipes[id];
    }

}
