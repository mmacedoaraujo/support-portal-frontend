import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  private titleSubject = new BehaviorSubject<string>('Users');
  public titleAction$ = this.titleSubject.asObservable();

  constructor() {}
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  public changeTitle(title: string): void {
    this.titleSubject.next(title);
  }

  ngOnInit(): void {}
}
