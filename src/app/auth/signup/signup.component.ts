import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('2s', style({ opacity: 1 })) // Adjusted the duration to 2 seconds
      ])
    ])
  ]
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }

async handleRegistration() {
  const { email, password, firstName, lastName } = this.signupForm.value;
  try {
    const response: any = await this.http.post(
      'https://flashcardsrestapi.azurewebsites.net/api/Authentification/register',
      { email, password, firstName, lastName },
      { withCredentials: true, observe: 'response' } // Dodajemy observe: 'response'
    ).toPromise();

    console.log('Server response:', response);

    if (response && [400, 401, 402, 500].includes(response.status)) {
      this.signupForm.setErrors({ email: 'Incorrect email or password' });
    } else if (response && response.status === 200) {
      this.signupForm.reset();
      this.router.navigate(['/auth/login']);
    } else {
      console.error('Unexpected response:', response);
      this.signupForm.setErrors({ email: 'Unexpected error occurred' });
    }
  } catch (error: any) {
    console.error('Error:', error);
    this.signupForm.setErrors({ email: error.toString() });
  }
}

  
}
