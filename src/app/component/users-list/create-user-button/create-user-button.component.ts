import { Component, EventEmitter, inject, OnDestroy, Output } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { IUserCreate } from "../../interfaces/iuser";
import { MatMiniFabButton } from "@angular/material/button";
import { MatTooltip } from "@angular/material/tooltip";
import { CreateUserFormComponent } from "../create-user-form/create-user-form.component";
import { ShadowDirective } from "../../directives/shadow.directive";
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-create-user-button',
    standalone: true,
    imports: [
        MatIcon,
        MatMiniFabButton,
        MatTooltip,
        ShadowDirective
    ],
    templateUrl: './create-user-button.component.html',
    styleUrl: './create-user-button.component.scss'
})
export class CreateUserButtonComponent implements OnDestroy {
    @Output()
    public createUserButton: EventEmitter<IUserCreate> = new EventEmitter<IUserCreate>();
    private dialog: MatDialog = inject(MatDialog);
    public snackBar: MatSnackBar = inject(MatSnackBar);
    private destroy$ = new Subject<void>();

    openCreateUserButton(): void {
        const dialogRef: MatDialogRef<CreateUserFormComponent> = this.dialog.open(CreateUserFormComponent);

        dialogRef.afterClosed()
            .pipe(takeUntil(this.destroy$))
            .subscribe((result: IUserCreate) => {
                if (result) {
                    this.createUserButton.emit(result);
                    this.snackBar.open('Юзер создан...', 'Ok!', { duration: 5000 });
                } else {
                    this.snackBar.open('Отмена создания...', 'Ok!', { duration: 5000 });
                }
            });
    };

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
