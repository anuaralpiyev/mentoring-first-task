import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {UserService} from "../services/user.service";

export const authGuard: CanActivateFn = (route, state) => {
    const userService: UserService = inject(UserService);
    const router: Router = inject(Router);

    if (userService.isAdmin) {
        return true;
    } else {
        return router.navigate(['users']).then((result: boolean) => {
            return false;
        })
    }
};
