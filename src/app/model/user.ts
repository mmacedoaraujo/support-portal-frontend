export class User {
  public id: number | undefined;
  public userId: string | undefined;
  public firstName: string;
  public lastName: string;
  public username: string;
  public email: string;
  public loginDateDisplay: Date | undefined;
  public joinDate: Date | undefined;
  public profileImageUrl: string | undefined;
  public isEnabled: boolean;
  public isNonLocked: boolean;
  public role: string;
  public authorities: [];

  constructor() {
    this.firstName = '';
    this.lastName = '';
    this.username = '';
    this.email = '';
    this.isEnabled = false;
    this.isNonLocked = false;
    this.role = '';
    this.authorities = [];
  }
}
