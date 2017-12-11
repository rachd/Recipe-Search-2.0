import { Component, OnInit } from '@angular/core';
import { DataService } from '../core/data.service';
import { IRecipe } from '../shared/interfaces';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Component({
  moduleId: module.id,
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./_recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  title: String;
  recipes: Observable<any[]>;

  constructor(db: AngularFirestore) {
    this.recipes = db.collection<IRecipe>('recipes').valueChanges();
  }

  ngOnInit() {
    this.title = "Recipes";
  }

  filteredRecipes(recipeList: IRecipe[]) {
  //   this.recipes = recipeList;
  }

}
