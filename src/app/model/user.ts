export class User {
  public userId!: string;
  public firstName!: string;
  public lastName!: string;
  public username!: string;
  public email!: string;
  public lastLoginDate!: Date;
  public lastLoginDateDisplay!: Date;
  public joinDate!: Date;
  public profileImageUrl!: string;
  public isEnabled!: boolean;
  public isNonLocked!: boolean;
  public role!: string;
  public authorities!: [];
}
