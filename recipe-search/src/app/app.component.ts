import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  moduleId: module.id,
  selector: 'app-container',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./_mixins.scss']
})
export class AppComponent {
  constructor(db: AngularFirestore){}
}
