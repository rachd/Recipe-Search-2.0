import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  addRecipeForm: FormGroup;

  constructor(private dataService: DataService, private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.addRecipeForm = this.fb.group({
      name: ['', Validators.required ],
      category: ''
    });
  }

  submit() {
    console.log(this.recipe);
    // this.dataService.insertRecipe(this.recipe);
  }

}
