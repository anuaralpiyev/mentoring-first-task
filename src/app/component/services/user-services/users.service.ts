import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {IUser, IUserCreate} from "../../interfaces/iuser";

@Injectable({providedIn: 'root'})
export class UsersService {

    private usersSubject$: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
    public readonly users$: Observable<IUser[]> = this.usersSubject$.asObservable();

    // установка юзера
    setUsers(users: IUser[]) {
        this.usersSubject$.next(users);
    };

    // редактировать юзера
    public editUser(user: IUser): void {
        const index: number = this.usersSubject$.value.findIndex((el: IUser) => el.id === user.id);

        this.usersSubject$.value[index] = user;
        this.setUsers(this.usersSubject$.value);
    }

    // editUser(editedUser: IUser): void {
    //     this.usersSubject$.next(
    //         this.usersSubject$.value.map(
    //             (user: IUser) => {
    //                 if (user.id === editedUser.id) {
    //                     return editedUser;
    //                 } else {
    //                     return user;
    //                 }
    //             }
    //         )
    //     );
    // };


    // создание юзера
    public createUser(user: IUser): void {
        const existingEmail: IUser | undefined = this.usersSubject$.value.find(
            (currentElement: IUser): boolean => currentElement.email === user.email
        );
        if (existingEmail === undefined) {
            const newUser: IUserCreate[] = [...this.usersSubject$.value, user];
            this.setUsers(newUser);
            alert('Новый юзер успешно добавлен!');
        } else {
            alert('Такой Email уже есть!');
        }
    }

    // public createUser(user: IUser): void {
    //     const existingEmail: IUser | undefined = this.usersSubject$.value.find(
    //         (currentElement: IUser): boolean => currentElement.email === user.email
    //     );
    //     if (existingEmail !== undefined) {
    //         alert('Такой email уже зарегистрирован!');
    //     } else {
    //         this.usersSubject$.next([...this.usersSubject$.value, user]);
    //         alert('Новый юзер успешно добавлен!');
    //     }
    // }


    // удаление юзера
    deleteUser(id: number): void {
        this.usersSubject$.next(
            this.usersSubject$.value.filter(
                (item: IUser) => item.id !== id
            )
        );
    };
}
