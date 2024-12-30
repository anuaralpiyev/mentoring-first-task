import { Component, EventEmitter, inject, OnDestroy, Output } from '@angular/core';
import { IUserCreate } from "../../interfaces/iuser";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTooltip } from "@angular/material/tooltip";
import { CreateUserFormComponent } from "../create-user-form/create-user-form.component";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { ShadowDirective } from "../../directives/shadow.directive";
import { Subject, takeUntil } from "rxjs";

@Component({
    selector: 'app-create-user-dialog',
    standalone: true,
    imports: [
        MatTooltip,
        MatButtonModule,
        MatIconModule,
        ShadowDirective
    ],
    templateUrl: './create-user-dialog.component.html',
    styleUrl: './create-user-dialog.component.scss'
})
export class CreateUserDialogComponent implements OnDestroy {
    @Output()
    public createUser: EventEmitter<IUserCreate> = new EventEmitter<IUserCreate>();

    private readonly dialog: MatDialog = inject(MatDialog);
    public snackBar: MatSnackBar = inject(MatSnackBar)
    private destroy$ = new Subject<void>();

    openCreateDialog(): void {
        const dialogRef: MatDialogRef<CreateUserFormComponent> = this.dialog.open(CreateUserFormComponent);

        dialogRef.afterClosed()
            .pipe(takeUntil(this.destroy$))
            .subscribe((result: IUserCreate) => {
                if (result) {
                    this.createUser.emit(result);
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
