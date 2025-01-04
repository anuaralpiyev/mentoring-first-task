import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { IUserRole } from "../interfaces/iuser";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private readonly router: Router = inject(Router);
    private readonly userSubject$: BehaviorSubject<IUserRole | null> = new BehaviorSubject<IUserRole | null>(null);
    public readonly user$: Observable<IUserRole | null> = this.userSubject$.asObservable();

    private user: IUserRole = {
        name: 'anuar',
        email: 'the.majik@gmail.com',
        isAdmin: null,
    };

    public loginAsAdmin() {
        this.userSubject$.next({ ...this.user, isAdmin: true });
    };

    public loginAsUser() {
        this.userSubject$.next({ ...this.user, isAdmin: false });
    };

    public get isAdmin() {
        return this.userSubject$.value?.isAdmin;
    };

    public logout() {
        this.userSubject$.next(null);
        this.router.navigate(['']).then((result: boolean) => false);
    };
}
