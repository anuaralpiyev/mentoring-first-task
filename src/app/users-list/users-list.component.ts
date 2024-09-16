import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

export interface User {
  id: number;
  name: string;
  usermane: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  standalone: true,
  imports: [NgFor, NgIf],
})
export class UsersListComponent {
  readonly apiService = inject(HttpClient);
  users: User[] = [];

  constructor() {
    this.apiService
      .get<User[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe((response: any) => {
        this.users = response;
        console.log('USERS: ', this.users);
      } );
  }

  deleteUser(id: number) {
    this.users = this.users.filter((item) => item.id !== id);
  }
}

// Метод .subscribe() в Angular используется для того, чтобы "подписаться" на Observable — поток данных,
// который возвращает, например, HTTP-запрос или событие. Подписка позволяет получать данные
// по мере их поступления и выполнять действия, как только данные станут доступны.
