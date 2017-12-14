import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params }   from '@angular/router';
import { IRecipe, IIngredient, IDirection } from '../../shared/interfaces';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

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

  private itemsCollection: AngularFirestoreCollection<IRecipe>;

  isEdit = false;

  recipeForm: FormGroup;

  constructor(private afs: AngularFirestore, private fb: FormBuilder, private route: ActivatedRoute) {
    this.itemsCollection = afs.collection<IRecipe>('recipes');
    this.createForm();
  }

  ngOnInit() {
    if(this.route.snapshot.params['id']) {
      let id = this.route.snapshot.params['id'];
      this.getRecipe(id);
      this.isEdit = true;
    }
  }

  getRecipe(id:string) {
    let docRef = this.afs.collection('recipes').doc(id);
    docRef.ref.get().then((doc) => {
        if (doc.exists) {
          this.recipe = doc.data() as IRecipe;
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
        } else {
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
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
    this.recipe.id = this.recipe.id ? this.recipe.id : this.afs.createId();
    this.itemsCollection.doc(this.recipe.id).set(this.recipe, { merge: true })
    .then(() => window.location.replace('/recipes/' + this.recipe.id));
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
