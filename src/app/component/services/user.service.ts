import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {IUserRole} from "../interfaces/iuser";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private readonly userSubject$: BehaviorSubject<IUserRole | null> = new BehaviorSubject<IUserRole | null>(null);
    public readonly user$: Observable<IUserRole | null> = this.userSubject$.asObservable();

    constructor(private router: Router) {
    };

    private user: IUserRole = {
        name: 'anuar',
        email: 'the.majik@gmail.com',
        isAdmin: null,
    };

    public loginAsAdmin() {
        this.userSubject$.next({...this.user, isAdmin: true});
    };

    public loginAsUser() {
        this.userSubject$.next({...this.user, isAdmin: false});
    };

    // public get isAdmin() {
    //     return this.userSubject$.value?.isAdmin;
    // };

    public get isAdmin() {
        if (this.userSubject$.value) {
            return this.userSubject$.value.isAdmin;
        } else {
            return false;
        }
    }

    public logout() {
        this.userSubject$.next(null);
        this.router.navigate(['']).then((result: boolean) => false);
    }
}
