import { Injectable } from '@angular/core';
import { User } from './users-list/users-list.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  usersSubject$ = new BehaviorSubject<User[]>([]);
  // <User[]> - (<> дженрик тип) данных User[], озночает теперь в коробочке будет лежать Юзеры.
  users: User[] = [];

  //* Установка юзеров
  setUsers(users: User[]) {
    // можно писать Array<User> или так User[] смысл один и тот же.
    //! this.users = users;
    this.usersSubject$.next(users);
  }

  //* Изменение Юзера
  editUser(editedUser: User) {
    //! this.users = this.users.map((user) => {
    //!   if (user.id === editedUser.id) {
    //!     return editedUser;
    //!   } else {
    //!     return user;
    //!   }
    //! });

    this.usersSubject$.next(
      this.usersSubject$.value.map((user) => {
        if (user.id === editedUser.id) {
          return editedUser;
        } else {
          return user;
        }
      })
    );
  }

  //* Создаем юзера
  createdUser(user: User) {
    //! this.users = [...this.users, user]; // добавили нового Юзера
    this.usersSubject$.next([...this.usersSubject$.value, user]); // добавили нового Юзера
    // spreadOperation ... работает с объектами
    // restOperation ... работает с массивами
  }

  //* Удаляем юзера
  deleteUser(id: number) {
    //! this.users = this.users.filter((item) => {
    //!   if (id === item.id) {
    //!     return false;
    //!   } else {
    //!     return true;
    //!   }
    //! });
    this.usersSubject$.next(
      this.usersSubject$.value.filter((item) => {
        if (id === item.id) {
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
