import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

//Grab everything with import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { IRecipe } from '../shared/interfaces';

@Injectable()
export class DataService {

    baseUrl: string = '/api/recipes';

    recipes: [IRecipe] = [
      { "name": "Lemon Bars",
        "category": "Desserts",
        "ingredients": [{"ingredient": "flour", "quantity": "1 1/2 cups + 3 tbsp"},
                      {"ingredient": "butter", "quantity": "3/4 cup"},
                      {"ingredient": "lemons", "quantity": "2"},
                      {"ingredient": "eggs", "quantity": "3"},
                      {"ingredient": "sugar", "quantity": "1 cup"},
                      {"ingredient": "baking powder", "quantity": "1/2 tsp"},
                      {"ingredient": "salt", "quantity": "1/2 tsp"}]
      },
      { "name": "Sugar Cookies",
        "category": "Desserts",
        "ingredients": [{"ingredient": "flour", "quantity": "1 1/3 cups"},
                      {"ingredient": "salt", "quantity": "1/4 tsp"},
                      {"ingredient": "butter", "quantity": "1/2 cup"},
                      {"ingredient": "eggs", "quantity": "1"},
                      {"ingredient": "vanilla extract", "quantity": "1 tsp"}]
      },
      { "name": "Challah",
        "category": "Breads",
        "ingredients": [{"ingredient": "flour", "quantity": "16 3/4 ounces (3 1/2 cups)"},
                      {"ingredient": "warm water", "quantity": "1/4 cup"},
                      {"ingredient": "eggs", "quantity": "4"},
                      {"ingredient": "vegetable oil", "quantity": "1/4 cup"},
                      {"ingredient": "honey", "quantity": "1/4 cup"},
                      {"ingredient": "salt", "quantity": "1 1/2 tsp"}]
      }
    ];

    constructor(private http: Http) {

    }

    getRecipes(): Observable<IRecipe[]> {
      return this.http.get(this.baseUrl)
        .map((res: Response) => res.json())
        .catch(this.handleError);
    }

    getSingleRecipe(id: String): Observable<IRecipe> {
      return this.http.get(this.baseUrl + '/' + id)
        .map((res: Response) => res.json())
        .catch(this.handleError);
    }

    insertRecipe(recipe: IRecipe): Observable<IRecipe> {
      return this.http.post(this.baseUrl, recipe)
        .map((res: Response) => {
          const data = res.json();
          console.log('insertRecipe status: ' + data.status);
          return data.recipe;
        })
        .catch(this.handleError);
    }

    updateRecipe(recipe: IRecipe): Observable<IRecipe> {
      return this.http.put(this.baseUrl + '/' + recipe._id, recipe)
        .map((res: Response) => {
          const data = res.json();
          console.log('updateRecipe status: ' + data.status);
          return data.recipe;
        })
        .catch(this.handleError);
    }

    deleteRecipe(id: String): Observable<IRecipe> {
      return this.http.delete(this.baseUrl + '/' + id)
        .map((res: Response) => res.json().status)
        .catch(this.handleError);
    }

    private handleError(error: any) {
      console.error('server error:', error);
      if (error instanceof Response) {
        let errorMessage = '';
        try {
          errorMessage = error.json().error;
        } catch(err) {
          errorMessage = error.statusText;
        }
        return Observable.throw(errorMessage);
      }
      return Observable.throw(error || 'Node.js server error');
    }

}
