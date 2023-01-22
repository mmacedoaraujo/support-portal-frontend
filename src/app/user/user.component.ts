import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { NotificationType } from '../enum/notification-type.enum';
import { User } from '../model/user';
import { NotificationService } from '../service/notification.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  private titleSubject = new BehaviorSubject<string>('Users');
  public titleAction$ = this.titleSubject.asObservable();
  public users!: User[];
  public refreshing!: boolean;
  public selectedUser!: User;
  public fileName?: any;
  public profileImage?: any;
  private subscriptions: Subscription[] = [];


  constructor(private userService: UserService, private notificationService: NotificationService) { }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.getUsers(true);
  }

  public changeTitle(title: string): void {
    this.titleSubject.next(title);
  }

  public getUsers(showNotification: boolean): void {
    this.refreshing = true;
    this.subscriptions.push(
      this.userService.getUsers().subscribe(
        (response: any) => {
          this.userService.addUsersToLocalCache(response);
          this.users = response;
          this.refreshing = false;
          if (showNotification) {
            this.sendNotification(NotificationType.SUCCESS, `${response.length} users loaded successfully`)
          }
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        }
      )
    );

  }

  public onSelectUser(selectedUser: User): void {
    this.selectedUser = selectedUser;
    document.getElementById('openUserInfo')?.click();

  }

  public onProfileImageChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.fileName = target.files?.item.name;
    this.profileImage = target.files?.item;
    console.log(files);
  }

  public saveNewUser() {
    document.getElementById('new-user-save')?.click();
  }

  private sendNotification(
    notiticationType: NotificationType,
    message: string
  ): void {
    if (message) {
      this.notificationService.showNotification(notiticationType, message);
    } else {
      this.notificationService.showNotification(
        notiticationType,
        'An error occurred, please try again.'
      );
    }
  }
}
function setFile(arg0: { picturePreview: string; pictureAsFile: any; }) {
  throw new Error('Function not implemented.');
}

