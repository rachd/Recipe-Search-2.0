import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { IRecipe } from '../../shared/interfaces';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent{// implements OnInit {
  recipe: IRecipe;

  constructor(private afs: AngularFirestore, private route: ActivatedRoute) {    
  }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];    
    let docRef = this.afs.collection('recipes').doc(id);
    docRef.ref.get().then((doc) => {
        if (doc.exists) {
          console.log(doc.data());
            this.recipe = doc.data() as IRecipe;
        } else {
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
  }

  deleteRecipe() {
    // let deleteConfirm = confirm("Are you sure you want to delete this recipe?");
    // if (deleteConfirm) {
    //     this.dataService.deleteRecipe(this.recipe._id).subscribe(() => window.location.replace('/'));
    // }
  }

}
