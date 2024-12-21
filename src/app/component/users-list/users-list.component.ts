import {Component, inject} from '@angular/core';
import {UsersApiService} from "../services/user-services/users-api.service";
import {UsersService} from "../services/user-services/users.service";
import {IUser, IUserCreate} from "../interfaces/iuser";
import {AsyncPipe, NgFor} from "@angular/common";
import {UserCardComponent} from "./user-card/user-card.component";
import {CreateUserDialogComponent} from "./create-user-dialog/create-user-dialog.component";
import {CreateUserButtonComponent} from "./create-user-button/create-user-button.component";


@Component({
    selector: 'app-users-list',
    standalone: true,
    imports: [
        NgFor,
        AsyncPipe,
        UserCardComponent,
        CreateUserDialogComponent,
        CreateUserButtonComponent
    ],
    templateUrl: './users-list.component.html',
    styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
    public readonly usersApiService: UsersApiService = inject(UsersApiService)
    public readonly usersService: UsersService = inject(UsersService)


    constructor() {
        this.usersApiService.getUsers().subscribe((responce: any) => {
            this.usersService.setUsers(responce)
        });

        this.usersService.users$.subscribe(
            (users: IUser[]) => console.log(users)
        )
    }


    createUser(user: IUserCreate) {
        this.usersService.createUser({
            id: new Date().getTime(),
            name: user.name,
            email: user.email,
            website: user.website,
            phone: user.phone,
            company: {
                name: user.company.name
            }
        });
    }

    editUser(user: IUser) {
        this.usersService.editUser({
            ...user
        });
    }

    deleteUser(id: number) {
        this.usersService.deleteUser(id)
    }
}
