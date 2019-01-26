import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User | null;
  redirectUrl: string;

  constructor() { }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  login(userNameLstring, password: string): void {
    // Code here would log into a back end service
    // and return user information
    // this is just hard-coded here.
    this.currentUser = {
      id: 2,
      userName: userNameLstring,
      isAdmin: false
    };
  }

  logout(): void {
    this.currentUser = null;
  }

}
