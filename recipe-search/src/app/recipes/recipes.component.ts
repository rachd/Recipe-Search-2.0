import { Component, OnInit } from '@angular/core';
import { IRecipe, IQuery } from '../shared/interfaces';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable, Subject } from 'rxjs';
import * as firebase from 'firebase';

@Component({
  moduleId: module.id,
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./_recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  title: String;
  recipeObservable: Observable<any[]>;
  query: Subject<IQuery>;
  queryObservable: Observable<any[]>;
  recipes: IRecipe[];

  constructor(db: AngularFirestore) {
    this.recipeObservable = db.collection<IRecipe>('recipes').valueChanges();
    this.query = new Subject<IQuery>();
    this.queryObservable = this.query.switchMap(({name, category, ingredients}) =>
      db.collection('recipes', ref => {
        let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        if (category) { query = query.where('category', '==', category) };
        if (name) { query = query.where('name', '==', name) };
        return query;
      }).valueChanges());
  }

  ngOnInit() {
    this.title = "Recipes";
    this.recipeObservable.subscribe(result => {
      this.recipes = result;
    });
    this.queryObservable.subscribe(queriedItems => {
      this.recipes = queriedItems;  
    });
  }

  filteredRecipes(queryList: IQuery) {
    this.query.next(queryList);
  }

}
