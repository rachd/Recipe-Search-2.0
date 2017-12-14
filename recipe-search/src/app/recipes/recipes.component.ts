import { Component, OnInit } from '@angular/core';
import { IRecipe, IQuery } from '../shared/interfaces';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable, Subject } from 'rxjs';

@Component({
  moduleId: module.id,
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./_recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  title: String;
  recipeObservable: Observable<any[]>;
  query: Subject<string>;
  queryObservable: Observable<any[]>;
  recipes: IRecipe[];

  constructor(db: AngularFirestore) {
    this.recipeObservable = db.collection<IRecipe>('recipes').valueChanges();
    this.query = new Subject<string>();
    this.queryObservable = this.query.switchMap(category =>
      db.collection('recipes', ref => ref.where('category', '==', category)).valueChanges());
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
    this.query.next(queryList.category);
  }

}
