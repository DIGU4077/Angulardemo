import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const loggedIn = localStorage.getItem('loggedIn');
    const loginTimestamp = localStorage.getItem('loginTimestamp');

    if (loggedIn === 'true' && loginTimestamp) {
      const currentTime = Date.now();
      const timeDiff = currentTime - parseInt(loginTimestamp);
      const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;

      if (timeDiff < sevenDaysInMs) {
        return true; // Allow navigation
      } else {
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('loginTimestamp');
        this.router.navigate(['/login']);
        return false; // Prevent navigation
      }
    }

    // Not logged in
    this.router.navigate(['/login']);
    return false;
  }
}
