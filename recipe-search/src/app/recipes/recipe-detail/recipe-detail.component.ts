import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { DataService } from '../../core/data.service';
import { IRecipe } from '../../shared/interfaces';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  recipe: IRecipe;

  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.getRecipe(id);
  }

  getRecipe(id: String) {
    this.dataService.getSingleRecipe(id).subscribe((recipe: IRecipe) => {
      this.recipe = recipe;
    });
  }

  deleteRecipe() {
    let deleteConfirm = confirm("Are you sure you want to delete this recipe?");
    if (deleteConfirm) {
        this.dataService.deleteRecipe(this.recipe._id).subscribe(() => window.location.replace('/'));
    }
  }

}
