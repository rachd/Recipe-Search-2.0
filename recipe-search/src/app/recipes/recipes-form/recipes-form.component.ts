import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params }   from '@angular/router';
import { DataService } from '../../core/data.service';
import { IRecipe, IIngredient } from '../../shared/interfaces';

@Component({
  selector: 'app-recipes-form',
  templateUrl: './recipes-form.component.html',
  styleUrls: ['./recipes-form.component.scss']
})
export class RecipesFormComponent implements OnInit {

  recipe: IRecipe = {
    name: '',
    category: '',
    ingredients: [{ingredient: "", quantity: ""}],
    directions: [{direction: ""}]
  }

  isEdit = false;

  recipeForm: FormGroup;

  constructor(private dataService: DataService, private fb: FormBuilder, private route: ActivatedRoute) {
    this.createForm();
  }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    if(id !== '0') {
      this.getRecipe(id);
      this.isEdit = true;
    }
  }

  getRecipe(id: String) {
    this.dataService.getSingleRecipe(id).subscribe((recipe: IRecipe) => {
      this.recipe = recipe;
      this.recipeForm.patchValue({
        name: this.recipe.name
      });
      this.recipeForm.patchValue({
        category: this.recipe.category
      });
      this.recipeForm.patchValue({
        ingredients: this.recipe.ingredients
      });
      this.recipeForm.patchValue({
        directions: this.recipe.directions
      });
    });
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
      ]),
      directions: this.fb.array([
        this.fb.group({
          direction: ''
        })
      ])
    });
  }

  submit() {
    Object.assign(this.recipe, this.recipeForm.value);
    if (this.isEdit) {
      this.dataService.updateRecipe(this.recipe).subscribe((recipe: IRecipe) => this.recipe = recipe);
    } else {
      this.dataService.insertRecipe(this.recipe).subscribe((recipe: IRecipe) => this.recipe = recipe);
    }
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

  get directions(): FormArray {
    return this.recipeForm.get('directions') as FormArray;
  }

  addDirection() {
    this.directions.push(this.fb.group({
      direction: ''
    }));
  }

  removeDirection(i) {
    this.directions.removeAt(i);
  }

}
