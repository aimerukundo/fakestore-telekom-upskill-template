import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../types/user.type';
import { AuthModalService } from './auth-modal.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  

  private apiUrl = 'https://fakestoreapi.com';

  constructor(private http: HttpClient, private router: Router) {}

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.apiUrl}/users`);
  }

  logout() {
    localStorage.removeItem('user');
  }
}
