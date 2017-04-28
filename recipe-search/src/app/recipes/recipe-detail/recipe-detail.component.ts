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
  @Input() recipe: IRecipe;

  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.recipe = this.dataService.getSingleRecipe(this.route.params['id']);
    console.log(this.route.params['id']);
  }

}
