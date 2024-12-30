import { Component, inject } from '@angular/core';
import { UsersApiService } from "../services/users-api.service";
import { UsersService } from "../services/users.service";
import { IUser, IUserCreate } from "../interfaces/iuser";
import { AsyncPipe, NgFor } from "@angular/common";
import { UserCardComponent } from "./user-card/user-card.component";
import { CreateUserDialogComponent } from "./create-user-dialog/create-user-dialog.component";
import { CreateUserButtonComponent } from "./create-user-button/create-user-button.component";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { selectUsers } from "./store/users.selectors";
import { UsersActions } from "./store/users.actions";


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
    private readonly store = inject(Store);
    public readonly users$: Observable<IUser[]> = this.store.select(selectUsers);

    constructor() {
        this.store.dispatch(UsersActions.load());
    };

    createUser(user: IUserCreate) {
        this.store.dispatch(
            UsersActions.create({
                user: {
                    id: new Date().getTime(),
                    name: user.name,
                    email: user.email,
                    website: user.website,
                    phone: user.phone,
                    company: {
                        name: user.company.name
                    }
                }
            })
        );
    };

    editUser(user: IUser) {
        this.store.dispatch(UsersActions.edit({ user }));
    };

    deleteUser(id: number) {
        this.store.dispatch(UsersActions.delete({ id }));
    };
}
