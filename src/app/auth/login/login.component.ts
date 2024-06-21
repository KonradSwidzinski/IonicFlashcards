import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('2s', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async handleLogin() {
    const { email, password } = this.loginForm.value;
    try {
      const response: any = await this.http.post(
        'https://flashcardsrestapi.azurewebsites.net/api/Authentification/login',
        { email, password },
        { withCredentials: true, observe: 'response' }
      ).toPromise();

      if (response && response.status === 200) {
        localStorage.setItem('user', response.body.userId); // Assuming response contains userId
        this.router.navigate(['/home']).then(() => {
          window.location.reload(); // Force reload the page to refresh the component
        });
      } else {
        this.triggerVibration();
        this.loginForm.setErrors({ email: 'Incorrect email or password' });
      }
    } catch (error: any) {
      console.error('Error:', error);
      this.triggerVibration();
      this.loginForm.setErrors({ email: error.toString() });
    }
  }

  triggerVibration() {
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200]);
    } else {
      alert('Vibration API is not supported in this browser.');
    }
  }
}
