import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { NotificationType } from '../enum/notification-type.enum';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private authenticationservice: AuthenticationService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return true;
  }

  private isUserLoggedIn(): boolean {
    if (this.authenticationservice.isLoggedIn()) {
      return this.isUserLoggedIn();
    }

    this.router.navigate(['/login']);
    this.notificationService.showNotification(
      NotificationType.ERROR,
      'You need to log in to access this page'.toUpperCase()
    );
    return false;
  }
}
