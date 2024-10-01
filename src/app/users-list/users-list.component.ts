import { AsyncPipe, formatDate, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UsersApiService } from '../users-api.service';
import { UserCardComponent } from './user-card/user-card.component';
import { UsersService } from '../users.service';
import { CreateUserFormComponent } from '../create-user-form/create-user-form.component';

export interface User {
  id: number;
  name: string;
  username?: string;
  email: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone?: string;
  website: string;
  company: {
    name: string;
    catchPhras?: string;
    bs?: string;
  };
}

export interface CreateUserInterface {
  id: number;
  name: string;
  email: string;
  website: string;
  companyName: string;
}

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  standalone: true,
  imports: [NgFor, NgIf, UserCardComponent, AsyncPipe, CreateUserFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // changeDetection: ChangeDetectionStrategy.OnPush для реактивных данных RXJS
  // с этой функцией OnPush работа кода и сайта с данными идет намного быстрее
})
export class UsersListComponent {
  readonly usersApiService = inject(UsersApiService);
  readonly usersService = inject(UsersService); // передали из файла users.service.ts

  constructor() {
    // подписка => получение данных методом getUsers из файла users-api.service.ts
    this.usersApiService.getUsers().subscribe((response: any) => {
      // подписка => установка и загрузка данных методом setUsers из файла users.service.ts
      this.usersService.setUsers(response);
    });

    this.usersService.users$.subscribe((users) => console.log(users));
  }

  deleteUserList(id: number) {
    // удаления данных используя метод deleteUser из файла users.service.ts
    this.usersService.deleteUser(id);
  }

  public createUserList(formDate: CreateUserInterface) {
    this.usersService.createUser({
      id: new Date().getTime(),
      name: formDate.name,
      email: formDate.email,
      website: formDate.website,
      company: {
        name: formDate.companyName,
      },
    });
    console.log('ДАННЫЕ ФОРМЫ: ', event);
  }
}
