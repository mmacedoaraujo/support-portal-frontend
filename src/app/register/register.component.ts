import { NotificationType } from './../enum/notification-type.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../model/user';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  public showLoading: boolean = false;
  private subscriptions: Subscription[] = [];
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private noitificationService: NotificationService
  ) {}

  ngOnInit(): void {
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigateByUrl('/users/management');
    }
  }

  public onRegister(user: User): void {
    console.log(user);
    this.showLoading = true;
    this.subscriptions.push(
      this.authenticationService.register(user).subscribe(
        (response: User | any) => {
          this.showLoading = false;
          this.sendNotification(
            NotificationType.SUCCESS,
            `A new account was created for ${response.firstName}. Please check your email for password to log in.`);
        },
        (errorResponse: HttpErrorResponse) => {
          console.log(errorResponse);
          this.sendNotification(
            NotificationType.ERROR,
            errorResponse.error.message
          );
          this.showLoading = false;
        }
      )
    );
  }

  private sendNotification(
    notiticationType: NotificationType,
    message: string
  ): void {
    if (message) {
      this.noitificationService.showNotification(notiticationType, message);
    } else {
      this.noitificationService.showNotification(
        notiticationType,
        'An error occurred, please try again.'
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
