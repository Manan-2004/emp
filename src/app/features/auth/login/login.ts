import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { MessagesServices } from '../../../core/messages/messages-services';

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
  private messageService=inject(MessagesServices)

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  login() {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    this.authService.getUsers().subscribe(users => {

      const user = users.find(x =>
        x.username === username &&
        x.password === password
      );

      if (!user) {
        this.messageService.error("Invalid Username or Password")
        return;
      }

      const token = 'EMS_' + Date.now();

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      this.authService.setUser(user);

      if (user.role === 'admin') {
        this.messageService.success("Welcome Admin For Ems System")
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.messageService.success("Welcome User For Ems System")
        this.router.navigate(['/user/dashboard']);
      }
    });
  }
}
