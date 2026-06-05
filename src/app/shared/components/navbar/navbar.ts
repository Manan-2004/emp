import { Component, inject } from '@angular/core';
import { currentUser } from '../../../core/state/auth.state';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { MessagesServices } from '../../../core/messages/messages-services';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private authService=inject(AuthService)
  private router=inject(Router)
  private messageService=inject(MessagesServices)
  user=currentUser
  
  logout(){
    this.authService.logout()
    this.messageService.success(`Logout SuccessFully`)
    this.router.navigate(['/'])
  }
}
