import { Injectable } from '@angular/core';

import { Router, CanActivate } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private login: LoginService, private router: Router) { }

  canActivate(): boolean {
    if (!this.login.isAuthenticated()) {
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
