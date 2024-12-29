import {Component, EventEmitter, inject, Output} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {IUserCreate} from "../../interfaces/iuser";
import {MatMiniFabButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {CreateUserFormComponent} from "../create-user-form/create-user-form.component";
import {ShadowDirective} from "../../directives/shadow.directive";
import {take} from "rxjs";

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
export class CreateUserButtonComponent {
    @Output()
    public createUserButton: EventEmitter<IUserCreate> = new EventEmitter<IUserCreate>();

    public dialog: MatDialog = inject(MatDialog);

    public snackBar: MatSnackBar = inject(MatSnackBar);

    openCreateUserButton(): void {
        const dialogRef: MatDialogRef<CreateUserFormComponent> = this.dialog.open(CreateUserFormComponent);

        dialogRef.afterClosed().pipe(take(1)).subscribe((result: IUserCreate) => {
            if (result) {
                this.createUserButton.emit(result);
                this.snackBar.open('Юзер создан...', 'Ok!', {
                    duration: 5000
                });
            } else {
                this.snackBar.open('Отмена создания...', 'Ok!', {
                    duration: 5000
                });
            }
        });
    };
}
