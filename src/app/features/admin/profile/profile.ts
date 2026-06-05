import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessagesServices } from '../../../core/messages/messages-services';
import { currentUser } from '../../../core/state/auth.state';
import { UserService } from '../../../core/services/auth/user.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  user = currentUser;
  private fb = inject(FormBuilder)
  private userService = inject(UserService)
  private messageService = inject(MessagesServices)
  private authService=inject(AuthService)
  private router=inject(Router)

  showEditForm = false;
  showPasswordForm = false;

  profileForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });

  passwordForm = this.fb.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  });

  openEditProfile() {
    this.showEditForm = true;
    this.profileForm.patchValue({
      name: this.user()?.name,
      email: this.user()?.email
    });
  }

  openPasswordForm() {
    this.showPasswordForm = true;
  }

  updateProfile() {

    let user = this.user();

    if (!user) return;

    let updatedUser = {
      ...user,
      name: this.profileForm.value.name!,
      email: this.profileForm.value.email!
    };

    this.userService
      .updateUser(user.id.toString(), updatedUser).subscribe({
        next: () => {
          localStorage.setItem(
          'user',
          JSON.stringify(
            updatedUser
          )
        );
          currentUser.set(updatedUser);
          this.messageService.success(
            'Profile Updated Successfully'
          );
          this.showEditForm = false;
        },
        error:(err)=>{
           console.log(err)
        }
      });

  }

  updatePassword() {

    let user = this.user();

    if (!user) return;

    if (this.passwordForm.value.currentPassword!== user.password){
      this.messageService.error('Current Password Incorrect');
      return;
    }

    if (this.passwordForm.value.newPassword!== this.passwordForm.value.confirmPassword) 
    {
      this.messageService.error('Passwords do not match')
      return;
    }

    let updatedUser = {
      ...user,
      password: this.passwordForm.value.newPassword!
    };

    this.userService
      .updateUser(user.id.toString(), updatedUser)
      .subscribe({
        next: () => {
          localStorage.setItem(
            'currentUser',
            JSON.stringify(updatedUser)
          );
          currentUser.set(updatedUser);
          this.passwordForm.reset();
          this.showPasswordForm = false;
          this.messageService.success(
            'Password Updated Successfully! Please Login Again'
          );
          this.authService.logout()
          this.router.navigate(['/'])
        },
        error:(err)=>{
           console.log(err)
        }
      });

  }

}