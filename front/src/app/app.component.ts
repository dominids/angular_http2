import { Component, OnInit } from '@angular/core';
import { UserService } from './service/user.service';
import { User } from './interface/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  users: User[] = [];
  title = 'angularhttp';

  private user: User = {
    "name": "dddd",
    "username": "Mark",
    "email": "mark3@gmail.com",
    "phone": "1234567",
  }
  private user1: any = {
    name: "User",
    username: "username",
    email: "normalUser@gmail.com",
    phone: "2137420",
  }

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    //this.onUpdateUser();
    //this.onPatchUser();
    //this.onGetUsers();
    //this.onGetUsers2();
    //this.onGetUsers3();
    ///this.onGetUser();
    this.onCreateUser();
    //this.onDeleteUser();
    //this.onTextFile();
  }
  onGetUsers(): void {
    this.userService.getUsers().subscribe(
      (response) => {
        console.table(response);
        this.users = response;
      },
      (error: any) => console.log(error),
      () => console.log('Done getting users')
    )
  }
  onGetUsers2(): void {
    this.userService.getUsers2().subscribe(
      (response) => console.log(response),
      (error: any) => console.log(error),
      () => console.log('Done getting users')
    )
  }
  onGetUsers3(): void {
    this.userService.getUsers3().subscribe(
      (response) => console.log(response),
      (error: any) => console.log(error),
      () => console.log('Done getting users')
    )
  }

  onTextFile(): void {
    this.userService.getTextFile().subscribe(
      (response) => console.log('Response:', response),
      (error: any) => console.log(error),
      () => console.log('Done getting files')
    )
  }

  onGetUser(): void {
    this.userService.getUser().subscribe(
      (response) => console.log(response),
      (error: any) => console.log(error),
      () => console.log('Done getting user')
    )
  }

  onCreateUser(): void {
    this.userService.createUser(this.user).subscribe(
      (response) => console.log(response),
      (error: any) => console.log(error),
      () => console.log('Done creating users')
    )
  }

  onUpdateUser(): void {
    this.userService.updateUser(this.user).subscribe(
      (response) => console.log(response),
      (error: any) => console.log(error),
      () => console.log('Done update users')
    )
  }

  onPatchUser(): void {
    this.userService.patchUser(this.user1).subscribe(
      (response) => console.log(response),
      (error: any) => console.log(error),
      () => console.log('Done patching users')
    )
  }
  onDeleteUser(): void {
    this.userService.deleteUser("idd").subscribe(
      (response) => console.log('Response from delete: ', response),
      (error: any) => console.log(error),
      () => console.log('Done deleting users')
    )
  }
}
