import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params }   from '@angular/router';
import { IQuery, IRecipe } from '../../shared/interfaces';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Subject } from 'rxjs';

@Component({
  selector: 'recipe-filters',
  templateUrl: './recipe-filters.component.html',
  styleUrls: ['./recipe-filters.component.scss']
})
export class RecipeFiltersComponent {
  @Output() filteredRecipes = new EventEmitter<Object>();

  query: IQuery = {
    name: '',
    category: '',
    ingredients : [{ingredient: ''}]
  }
  filtersForm: FormGroup;
  private itemsCollection: AngularFirestoreCollection<IRecipe>;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private afs: AngularFirestore) {
    this.createForm();
    this.itemsCollection = afs.collection<IRecipe>('recipes');
  }

  createForm() {
    this.filtersForm = this.fb.group({
      name: ['', Validators.required ],
      category: '',
      ingredients: this.fb.array([
        this.fb.group({
          ingredient: ''
        })
      ]),
    });
  }

  submit() {
    Object.assign(this.query, this.filtersForm.value);
    this.filteredRecipes.emit({category:this.query.category});
  }

  get ingredients(): FormArray {
    return this.filtersForm.get('ingredients') as FormArray;
  }

  addIngredient(ingredient = {ingredient: ''}) {
    this.ingredients.push(this.fb.group(ingredient));
  }

  removeIngredient(i) {
    this.ingredients.removeAt(i);
  }

}
