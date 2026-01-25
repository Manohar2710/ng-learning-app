import { HttpClient } from '@angular/common/http';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { single } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  routes = inject(Router);
  private formBuilder = inject(FormBuilder);
  private http = inject(HttpClient);
  apiUrl = environment.apiURl;
  loginError = signal<string | null>(null);
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [
        Validators.required,
        Validators.minLength(3),
      ]],
      password:['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      rememberMe: [false]
    })
  }
  onSubmit() {
    if(this.loginForm.valid) {
      this.http.post(`${this.apiUrl}/api/login`, this.loginForm.value).subscribe(
        {
          next: (res: any) => {
            this.routes.navigate(['products'])
          },
          error: (res) => {
            this.loginError.set('Invalid credentials');
          }
        }
      )
    }
  }

  get usernameField() {
    return this.loginForm.get("username");
  }
  get passwordField() {
    return this.loginForm.get("password");
  }
}
