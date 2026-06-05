import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../../../models/user.model';
import { API_ENDPOINTS } from '../../../constants/api-endpoints';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  private http = inject(HttpClient);

  getUsers() {
    return this.http.get<User[]>(API_ENDPOINTS.USERS);
  }

  createUser(data: User) {
    return this.http.post<User>(API_ENDPOINTS.USERS,data);
  }

  updateUser(id: string, data: any) {
    return this.http.put<User>(`${API_ENDPOINTS.USERS}/${id}`, data)
  }

  getUserById(id: string) {
    return this.http.get<User>(`${API_ENDPOINTS.USERS}/${id}`)
  }

  deleteUser(id: string) {
    return this.http.delete(`${API_ENDPOINTS.USERS}/${id}`);
  }

}
