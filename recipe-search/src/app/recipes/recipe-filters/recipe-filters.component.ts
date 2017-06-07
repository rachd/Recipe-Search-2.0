import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params }   from '@angular/router';
import { DataService } from '../../core/data.service';
import { IQuery, IRecipe } from '../../shared/interfaces';

@Component({
  selector: 'recipe-filters',
  templateUrl: './recipe-filters.component.html',
  styleUrls: ['./recipe-filters.component.scss']
})
export class RecipeFiltersComponent {
  @Output() filteredRecipes = new EventEmitter<IRecipe[]>();

  query: IQuery = {
    name: '',
    category: '',
    ingredients : [{ingredient: ''}]
  }
  filtersForm: FormGroup;

  constructor(private dataService: DataService, private fb: FormBuilder, private route: ActivatedRoute) {
    this.createForm();
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
    this.dataService.getRecipes(this.query).subscribe((recipes: IRecipe[]) => {
      this.filteredRecipes.emit(recipes)
    });
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
