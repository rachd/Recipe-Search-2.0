import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params }   from '@angular/router';
import { DataService } from '../../core/data.service';
import { IRecipe, IIngredient, IDirection } from '../../shared/interfaces';

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
    if(this.route.snapshot.params['id']) {
      let id = this.route.snapshot.params['id'];
      console.log("id: " + id);
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
      this.removeIngredient(0);
      this.recipe.ingredients.map(ingredient => this.addIngredient(ingredient));
      this.removeDirection(0);
      this.recipe.directions.map(direction => this.addDirection(direction));
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
      this.dataService.updateRecipe(this.recipe).subscribe((recipe: IRecipe) => window.location.replace('/recipes/' + recipe._id));
    } else {
      this.dataService.insertRecipe(this.recipe).subscribe((recipe: IRecipe) => window.location.replace('/recipes/' + recipe._id));
    }
  }

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  addIngredient(ingredient: IIngredient = {ingredient: '', quantity: ''}) {
    this.ingredients.push(this.fb.group(ingredient));
  }

  removeIngredient(i) {
    this.ingredients.removeAt(i);
  }

  get directions(): FormArray {
    return this.recipeForm.get('directions') as FormArray;
  }

  addDirection(direction: IDirection = {direction: ''}) {
    this.directions.push(this.fb.group(direction));
  }

  removeDirection(i) {
    this.directions.removeAt(i);
  }

}
