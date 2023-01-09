import { NotificationType } from './../enum/notification-type.enum';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../model/user';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public showLoading: boolean = true;
  private subscriptions: Subscription[] = [];
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private noitificationService: NotificationService
  ) {}

  ngOnInit(): void {
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigateByUrl('/users/management');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  public onLogin(user: User): void {
    this.showLoading = true;
    console.log(user);
    this.subscriptions.push(
      this.authenticationService
        .login(user)
        .subscribe((response: HttpResponse<User> | any) => {
          const token: any = response.headers.get('Jwt-Token');
          this.authenticationService.saveToken(token);
          this.authenticationService.addUserToLocalCache(response.body);
          this.router.navigateByUrl('/users/management');
          this.showLoading = false;
        },
        (errorResponse: HttpErrorResponse) => {
          console.log(error);
          this.sendErrorNotification(NotificationType.ERROR, errorResponse.error.message);
          this.showLoading = false;
        }
    );
  }
  sendErrorNotification(notiticationType: NotificationType, message: string) {
   if (message) {
    this.noitificationService.showNotification(notiticationType, message);
   }else {
    this.noitificationService.showNotification(notiticationType, 'AN ERROR OCURRED, PLEASE TRY AGAIN');
   }
  }

  ngOnDestroy(): void {}
}
