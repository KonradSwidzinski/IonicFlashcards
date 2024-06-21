import { Component } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular';
import { fadeAnimation } from './app-routing.module';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  animations: [fadeAnimation]
})
export class AppComponent {
  userId: string;

  constructor() {
    this.userId = localStorage.getItem('userId') || '';
  }

  prepareRoute(outlet: IonRouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  setUser(user: string) {
    this.userId = user;
    if (user) {
      localStorage.setItem('userId', user);
    } else {
      localStorage.removeItem('userId');
    }
  }
}
