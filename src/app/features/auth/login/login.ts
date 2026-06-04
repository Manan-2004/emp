import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private authService = inject(AuthService)
  private fb = inject(FormBuilder)
  private router = inject(Router)

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  login() {
    let username = this.loginForm.value.username;
    let password = this.loginForm.value.password;

    this.authService.getUsers().subscribe(users => {
      let user = users.find(x => 
        x.username === username && x.password === password
      )

      if (!user) {
        alert('Invalid Credentials');
        return;
      }

      let token = 'EMS_' + Date.now()

      localStorage.setItem('token', token)

      localStorage.setItem('user', JSON.stringify(user))

      this.authService.setUser(user)

      if (user.role === 'admin') {
        this.router.navigate(['/admin/dashboard'])
      }
      else {
        this.router.navigate(['/user/dashboard']);
      }
      
    })

  }
}
