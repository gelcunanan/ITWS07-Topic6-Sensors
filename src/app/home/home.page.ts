import { AfterViewInit, Component, OnInit, signal } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonLabel,
  IonButton,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
  IonAlert,
  IonButtons,
  IonMenuButton,
} from '@ionic/angular/standalone';
import { Motion } from '@capacitor/motion';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonLabel,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonInput,
    IonGrid,
    IonRow,
    IonCol,
    IonAlert,
    IonButtons, IonMenuButton
  ],
})
export class HomePage implements OnInit{
 myAccel!: any;
  alpha!: any;
  beta!: any;
  gamma!: any;
  pose!: any;
  color = signal<string>('black')
  constructor() {}


  async basic() {
    const accel = await Motion.addListener('accel', (event) => {
      this.myAccel = event.accelerationIncludingGravity;
    });
  }

  async or() {
    const orient = await Motion.addListener('orientation', (event) => {
      this.alpha = event.alpha;
      this.beta = event.beta;
      this.gamma = event.gamma;
      this.pose = this.getOrientation(this.alpha, this.beta, this.gamma);
      if(event.beta >=40 || event.beta >= 90 ){
        this.color.set('white')
      }else{
        this.color.set('black')
      }
    });
  }

  // ChatGPT MALALA
  getOrientation(alpha: number, beta: number, gamma: number): string {
    switch (true) {
      // Lying flat (screen up)
      case beta > -45 && beta < 45 && gamma > -45 && gamma < 45:
        return 'nakahiga (screen up)';

      // Lying flat (screen down)
      case (beta > -45 && beta < 45 && gamma < -135) || gamma > 135:
        return 'nakahiga (screen down)';

      // Standing upright
      case beta > 45 && beta < 135:
        return 'nakatayo';

      // Upside down
      case beta < -45 && beta > -135:
        return 'nakabaligtad';

      // Face forward (tilted slightly)
      case gamma > 45 && gamma < 135:
        return 'nakaharap (tilted right)';

      case gamma < -45 && gamma > -135:
        return 'nakaharap (tilted left)';

      default:
        return 'unknown';
    }
  }

  ngOnInit() {
    this.basic();
    this.or();
  }
}
