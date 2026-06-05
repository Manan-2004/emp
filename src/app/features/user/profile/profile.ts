import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/auth/user.service';
import { MessagesServices } from '../../../core/messages/messages-services';
import { currentUser } from '../../../core/state/auth.state';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})

export class Profile {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private messageService = inject(MessagesServices);
  private authService = inject(AuthService)
  private router = inject(Router)
  loading = signal(true)
  
  ngOnInit(){
     setTimeout(()=>{
        this.loading.set(false)
     },500)
  }

  cuser = currentUser

  passwordForm = this.fb.group(
    {
      currentPassword: [
        '',
        Validators.required
      ],

      newPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
          )
        ]
      ],

      confirmPassword: [
        '',
        Validators.required
      ]
    },
  );

  get f() {
    return this.passwordForm.controls;
  }

  updatePassword() {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    let user = this.cuser()

    if (!user)
      return;

    if (this.passwordForm.value.currentPassword !== user.password) {
      this.messageService.error('Current password incorrect');
      return;
    }

    if (this.passwordForm.value.newPassword !== this.passwordForm.value.confirmPassword) {
      this.messageService.error('Passwords do not match');
      return;
    }

    let updatedUser = {
      ...user,
      password: this.passwordForm.value.newPassword
    }

    let uid = user.id.toString()
    this.userService.updateUser(uid, updatedUser).subscribe({
      next: () => {
        localStorage.setItem(
          'user',
          JSON.stringify(
            updatedUser
          )
        );
        this.cuser.set(updatedUser as any)
        this.passwordForm.reset();
        this.messageService.success(
          'Password Updated. Please Login Again'
        );
        this.authService.logout()
        this.router.navigate(['/'])
      },
      error: (err) => {
        console.log(err)
      }
    })
  }


}

