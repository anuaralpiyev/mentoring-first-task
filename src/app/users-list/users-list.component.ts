import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UsersApiService } from '../users-api.service';
import { UserCardComponent } from './user-card/user-card.component';
import { UsersService } from '../users.service';

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
  imports: [NgFor, UserCardComponent, AsyncPipe], //* AsyncPipe - (| async) - это специальная функция которая читает данные из коробочек с данныеми из Subject-ов
  changeDetection: ChangeDetectionStrategy.OnPush, // ChangeDetectionStrategy.OnPush  - В Angular будет проверять изменилсь ли ссылка на массив.
  //* changeDetection: ChangeDetectionStrategy.OnPush - чтобы его использовать мы не должны мутировать
  //* объекты, массивы а должны перезаписывать их чтобы менялась ссылка чтобы Angular видел изменения
  //* changeDetection: ChangeDetectionStrategy.OnPush - Благодаря нему по мере расширения приложения не будет зависать в будущем. 
})
export class UsersListComponent {
  readonly usersApiService = inject(UsersApiService);
  readonly usersService = inject(UsersService);

  constructor() {
    this.usersApiService.getUsers().subscribe((response: any) => {
      this.usersService.setUsers(response);
    });
  }

  deleteUserList(id: number) {
    this.usersService.deleteUser(id);
  }
}

// Метод .subscribe() в Angular используется для того, чтобы "подписаться" на Observable — поток данных,
// который возвращает, например, HTTP-запрос или событие. Подписка позволяет получать данные
// по мере их поступления и выполнять действия, как только данные станут доступны.
