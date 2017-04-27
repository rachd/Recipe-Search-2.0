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

    // getCustomers() : Observable<ICustomer[]> {
    //     return this.http.get(this.baseUrl)
    //                .map((res: Response) => {
    //                    let customers = res.json();
    //                    this.calculateCustomersOrderTotal(customers);
    //                    return customers;
    //                })
    //                .catch(this.handleError);
    // }

    // getCustomersPage(page: number, pageSize: number) : Observable<IPagedResults<ICustomer[]>> {
    //     return this.http.get(`${this.baseUrl}/page/${page}/${pageSize}`)
    //                 .map((res: Response) => {
    //                     const totalRecords = +res.headers.get('x-inlinecount');
    //                     let customers = res.json();
    //                     this.calculateCustomersOrderTotal(customers);
    //                     return {
    //                         results: customers,
    //                         totalRecords: totalRecords
    //                     };
    //                 })
    //                 .catch(this.handleError);
    // }

    // getCustomer(id: string) : Observable<ICustomer> {
    //     return this.http.get(this.baseUrl + '/' + id)
    //                 .map((res: Response) => res.json())
    //                 .catch(this.handleError);
    // }

    // insertCustomer(customer: ICustomer) : Observable<ICustomer> {
    //     return this.http.post(this.baseUrl, customer)
    //                .map((res: Response) => {
    //                    const data = res.json();
    //                    console.log('insertCustomer status: ' + data.status);
    //                    return data.customer;
    //                })
    //                .catch(this.handleError);
    // }

    // updateCustomer(customer: ICustomer) : Observable<ICustomer> {
    //     return this.http.put(this.baseUrl + '/' + customer._id, customer)
    //                .map((res: Response) => {
    //                    const data = res.json();
    //                    console.log('updateCustomer status: ' + data.status);
    //                    return data.customer;
    //                })
    //                .catch(this.handleError);
    // }

    // deleteCustomer(id: string) : Observable<boolean> {
    //     return this.http.delete(this.baseUrl + '/' + id)
    //                .map((res: Response) => res.json().status)
    //                .catch(this.handleError);
    // }

    // //Not used but could be called to pass "options" (3rd parameter) to
    // //appropriate POST/PUT/DELETE calls made with http
    // getRequestOptions() {
    //     const csrfToken = ''; //would retrieve from cookie or from page
    //     const options = new RequestOptions({
    //         headers: new Headers({ 'x-xsrf-token': csrfToken })
    //     });
    //     return options;
    // }

    // getStates(): Observable<IState[]> {
    //     return this.http.get('/api/states')
    //                .map((res: Response) => res.json())
    //                .catch(this.handleError);
    // }

    // calculateCustomersOrderTotal(customers: ICustomer[]) {
    //     for (let customer of customers) {
    //         if (customer && customer.orders) {
    //             let total = 0;
    //             for (let order of customer.orders) {
    //                 total += (order.price * order.quantity);
    //             }
    //             customer.orderTotal = total;
    //         }
    //     }
    // }

    // private handleError(error: any) {
    //     console.error('server error:', error);
    //     if (error instanceof Response) {
    //       let errMessage = '';
    //       try {
    //         errMessage = error.json().error;
    //       } catch(err) {
    //         errMessage = error.statusText;
    //       }
    //       return Observable.throw(errMessage);
    //       // Use the following instead if using lite-server
    //       //return Observable.throw(err.text() || 'backend server error');
    //     }
    //     return Observable.throw(error || 'Node.js server error');
    // }

}
