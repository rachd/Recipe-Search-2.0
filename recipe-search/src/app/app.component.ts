import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-container',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./_mixins.scss']
})
export class AppComponent {
  constructor(){}
}
