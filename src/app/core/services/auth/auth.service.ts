import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../../../models/user.model';
import { API_ENDPOINTS } from '../../../constants/api-endpoints';
import { currentUser, isLoggedIn } from '../../state/auth.state';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient)

  //get the all user
  getUsers() {
    return this.http.get<User[]>(
      API_ENDPOINTS.USERS
    )
  }

  setUser(user: User) {
    currentUser.set(user)
    isLoggedIn.set(true)
  }

  logout() {
    localStorage.clear()
    currentUser.set(null)
    isLoggedIn.set(false)
  }


  loadUser() {
    let user = localStorage.getItem('user')
    if (user) {
      currentUser.set(JSON.parse(user));
      isLoggedIn.set(true);
    }
  }
}
