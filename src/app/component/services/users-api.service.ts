import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IUser} from "../interfaces/iuser";


@Injectable({providedIn: "root"})
export class UsersApiService {
    private readonly http: HttpClient = inject(HttpClient);
    private readonly url: string = 'https://jsonplaceholder.typicode.com';

    getUsers(): Observable<IUser[]> {
        return this.http.get<IUser[]>(`${this.url}/users`)
    }
}