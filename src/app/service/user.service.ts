import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { CustomHttpResponse } from '../model/custom-http-response';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getUsers(): Observable<User[] | HttpErrorResponse> {
    return this.http.get<User[]>(`${this.host}/users/list`);
  }

  public addUser(formData: FormData): Observable<User | HttpErrorResponse> {
    return this.http.post<User>(`${this.host}/users/add`, formData);
  }

  public updateUser(formData: FormData): Observable<User | HttpErrorResponse> {
    return this.http.post<User>(`${this.host}/users/update`, formData);
  }

  public resetPassword(
    email: string
  ): Observable<CustomHttpResponse | HttpErrorResponse> {
    return this.http.get<CustomHttpResponse>(
      `${this.host}/users/resetpassword/${email}`
    );
  }

  public updateProfileImage(
    formData: FormData
  ): Observable<HttpEvent<User> | HttpErrorResponse> {
    return this.http.post<User>(
      `${this.host}/users/updateProfileImage`,
      formData,
      { reportProgress: true, observe: 'events' }
    );
  }

  public deleteUser(
    userId: number
  ): Observable<CustomHttpResponse | HttpErrorResponse> {
    return this.http.delete<CustomHttpResponse>(
      `${this.host}/users/delete/${userId}`
    );
  }

  public addUsersToLocalCache(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  public getUsersFromLocalCache(): User[] {
    if (localStorage.getItem('users')) {
      const user = localStorage.getItem('users');
      return user ? JSON.parse(user) : [];
    }
    return [];
  }

  public createUserFormData(
    loggedInUsername: string,
    user: User,
    profileImage: File
  ): FormData {
    const formData = new FormData();
    formData.append('currentUsername', loggedInUsername);
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('username', user.username);
    formData.append('email', user.email);
    formData.append('role', user.role);
    formData.append('profileImage', profileImage);
    formData.append('isEnabled', JSON.stringify(user.isEnabled));
    formData.append('isNonLocked', JSON.stringify(user.isNonLocked));
    return formData;
  }
}
