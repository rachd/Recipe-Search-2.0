import { Component } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../core/data.service';
import { IRecipe, IIngredient } from '../../shared/interfaces';

@Component({
  selector: 'app-recipes-form',
  templateUrl: './recipes-form.component.html',
  styleUrls: ['./recipes-form.component.scss']
})
export class RecipesFormComponent {

  recipe: IRecipe = {
    name: '',
    category: '',
    ingredients: [{ingredient: "", quantity: ""}]
  }

  recipeForm: FormGroup;

  constructor(private dataService: DataService, private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.recipeForm = this.fb.group({
      name: ['', Validators.required ],
      category: '',
      ingredients: this.fb.array([
        this.fb.group({
          ingredient: '',
          quantity: ''
        })
      ])
    });
  }

  submit() {
    console.log(this.recipe);
    // this.dataService.insertRecipe(this.recipe);
  }

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  addIngredient() {
    this.ingredients.push(this.fb.group({
      ingredient: '',
      quantity: ''
    }));
  }

  removeIngredient(i) {
    this.ingredients.removeAt(i);
  }

}
