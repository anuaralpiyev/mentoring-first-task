import { Component, inject, OnDestroy } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from "@angular/common";
import { RouterLink } from "@angular/router";
import { CustomCurrentDateTimePipe } from "../pipes/custom-current-date-time.pipe";
import { ColorBasketDirective } from "../directives/color-basket.directive";
import { ShadowDirective } from "../directives/shadow.directive";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { UserService } from "../services/user.service";
import { AuthComponent } from "../auth/auth.component";
import { MatButton } from "@angular/material/button";
import { LogoutComponent } from "../logout/logout.component";
import { customRemoveDashesPipe } from "../pipes/remove-dashes.pipe";
import { ShowCatalog } from "../utils/show-catalog";
import { Subject, takeUntil } from "rxjs";

const text: string = ShowCatalog('Каталог');

const menuItems: string[] = ['Каталог', 'Запчасти', ' Интерьер', ' Стиль', 'Партнеры'];

const upperCaseMenuItems: string[] = menuItems.map(
    (item: string) => item.toUpperCase()
)

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        NgIf,
        NgFor,
        RouterLink,
        CustomCurrentDateTimePipe,
        ColorBasketDirective,
        ShadowDirective,
        MatButton,
        AsyncPipe,
        customRemoveDashesPipe
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnDestroy {
    public readonly title: string = 'mentoring-first-task';

    private readonly dialog: MatDialog = inject(MatDialog);
    public readonly userService: UserService = inject(UserService);
    private destroy$ = new Subject<void>();

    public showCatalog: boolean = false;
    public menuItems: string[] = upperCaseMenuItems;
    public isUpperCase: boolean = true;

    public changeMenuText() {
        this.menuItems = upperCaseMenuItems.map(
            (item: string) => this.isUpperCase ? item.toLowerCase() : item.toUpperCase()
        )
        this.isUpperCase = !this.isUpperCase
    }

    public readonly headerItemMain: string = 'Главная';
    public readonly headerItemAboutCompany: string = 'О компании';
    public readonly headerItemCatalog: string = text;
    public readonly headerItemCurrentDate: string = 'Дата';


    public openLoginDialog(): void {
        const dialogRef: MatDialogRef<AuthComponent> = this.dialog.open(AuthComponent);

        dialogRef.afterClosed()
            .pipe(takeUntil(this.destroy$))
            .subscribe((result: string): void | null => {
                result === 'admin' ? this.userService.loginAsAdmin() :
                    result === 'user' ? this.userService.loginAsUser() : null;
            });
    };


    public openLogoutDialog(): void {
        const dialogRef: MatDialogRef<LogoutComponent> = this.dialog.open(LogoutComponent);

        dialogRef.afterClosed()
            .pipe(takeUntil(this.destroy$))
            .subscribe((result: string) => {
                result === 'logout' ? this.userService.logout() : null;
            });
    };

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
