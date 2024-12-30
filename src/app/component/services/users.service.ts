import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { IUser, IUserCreate } from "../interfaces/iuser";
import { LocalStorageService } from "./local-storage.service";
import { UsersApiService } from "./users-api.service";

@Injectable({ providedIn: 'root' })
export class UsersService {
    private readonly localStorageService: LocalStorageService = inject(LocalStorageService);
    private readonly usersApiService: UsersApiService = inject(UsersApiService);
    private usersSubject$: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
    public readonly users$: Observable<IUser[]> = this.usersSubject$.asObservable();
    private readonly localStorageUsersKey: string = 'users';
    

    private setUsers(usersData: IUser[]) {
        this.localStorageService.saveLocalStorage(
            this.localStorageUsersKey, usersData
        );

        this.usersSubject$.next(usersData);
    }


    public loadUsers(): void {
        const localStorageUsers: IUser[] | null = this.localStorageService.getLocalStorage('users');

        if (localStorageUsers) {
            this.usersSubject$.next(localStorageUsers);
        } else {
            this.usersApiService.getUsers().subscribe((users: IUser[]) => {
                this.usersSubject$.next(users);
            });
        }
    };


    public createUser(user: IUser): void {
        const existingEmail: IUser | undefined = this.usersSubject$.value.find(
            (currentElement: IUser): boolean => currentElement.email === user.email);

        if (existingEmail === undefined) {
            const newUser: IUserCreate[] = [...this.usersSubject$.value, user];
            this.setUsers(newUser);
        } else {
            alert('Такой Email уже есть!');
        }
    };


    public editUser(user: IUser): void {
        const index: number = this.usersSubject$.value.findIndex((el: IUser) => el.id === user.id);

        this.usersSubject$.value[index] = user;
        this.setUsers(this.usersSubject$.value);
    };


    public deleteUser(userId: number): void {
        const newArrayUsers: IUser[] = this.usersSubject$.value.filter(
            (user: IUser) => user.id !== userId);
        const findUser: IUser | undefined = this.usersSubject$.value.find(
            (user: IUser) => user.id === userId);

        if (findUser) this.setUsers(newArrayUsers);

        if (!localStorage.getItem(this.localStorageUsersKey)) {
            this.localStorageService.deleteLocalStorage(this.localStorageUsersKey);
        }
    };
}
