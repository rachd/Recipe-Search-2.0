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
