import {ApplicationConfig, isDevMode} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideEffects} from '@ngrx/effects';
import {provideStore} from '@ngrx/store';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {usersReducers} from "./component/users-list/store/users.reducers";
import {loadUsers} from "./component/users-list/store/users.effects";

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideHttpClient(),
        provideAnimationsAsync(),
        provideEffects({
            loadUsers
        }),
        provideStore({
            users: usersReducers
        }),
        provideStoreDevtools({maxAge: 25, logOnly: !isDevMode()})
    ]
};
