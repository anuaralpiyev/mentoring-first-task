import {Routes} from '@angular/router';
import {HomepageComponent} from "./component/homepage/homepage.component";
import {UsersListComponent} from "./component/users-list/users-list.component";
import {AuthComponent} from "./component/auth/auth.component";
import {authGuard} from "./component/guards/auth.guard";
import {AdminComponent} from "./component/admin/admin.component";

export const routes: Routes = [
    {
        path: '',
        component: HomepageComponent
    },
    {
        path: 'users',
        component: UsersListComponent
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [authGuard]
    }
];
