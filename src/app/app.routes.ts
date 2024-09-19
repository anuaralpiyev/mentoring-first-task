import { Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { HomehageComponent } from './homepage/homehage.component';

export const routes: Routes = [
    {
        path: '',
        component: HomehageComponent, 
    },
    {
        path: 'users',
        component: UsersListComponent,
    }
]

