import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {IUser} from "../../interfaces/iuser";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {MatIconModule} from "@angular/material/icon";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {EditUserFormComponent} from "../edit-user-form/edit-user-form.component";
import {DeleteUserDialogComponent} from "../delete-user-dialog/delete-user-dialog.component";
import {customUpperCasePipe} from "../../pipes/custom- upper-case.pipe";
import {customRemoveDashesPipe} from "../../pipes/remove-dashes.pipe";
import {ShadowDirective} from "../../directives/shadow.directive";
import {take} from "rxjs";

@Component({
    selector: 'app-user-card',
    standalone: true,
    imports: [
        MatButtonModule,
        MatTooltip,
        MatIconModule,
        customUpperCasePipe,
        customRemoveDashesPipe,
        ShadowDirective
    ],
    templateUrl: './user-card.component.html',
    styleUrl: './user-card.component.scss'
})
export class UserCardComponent {

    @Input()
    public user!: IUser;

    @Output()
    public deleteUser: EventEmitter<number> = new EventEmitter();

    @Output()
    public editUser: EventEmitter<IUser> = new EventEmitter<IUser>();


    private readonly dialog: MatDialog = inject(MatDialog);
    public snackBar: MatSnackBar = inject(MatSnackBar);


    openEditDialog(): void {
        const dialogRef: MatDialogRef<EditUserFormComponent> = this.dialog.open(EditUserFormComponent, {
            data: {user: this.user},
        });

        dialogRef.afterClosed().pipe(take(1)).subscribe((result: any) => {
            if (result) {
                this.editUser.emit(result);
                this.snackBar.open('Данные юзера обновились!', 'Ok!', {
                    duration: 5000
                });
            } else {
                this.snackBar.open('Отмена изменения', 'Ok!', {
                    duration: 5000
                });
            }
        });
    }


    openDeleteDialog(): void {
        const dialogRef: MatDialogRef<DeleteUserDialogComponent> = this.dialog.open(DeleteUserDialogComponent, {
            data: {user: this.user},
        });

        dialogRef.afterClosed().pipe(take(1)).subscribe((result: boolean | undefined) => {
            if (result) {
                this.deleteUser.emit(this.user.id);
                this.snackBar.open('Юзер удален...', 'Ok!', {
                    duration: 5000
                });
            } else {
                this.snackBar.open('Отмена удаления...', 'Ok!', {
                    duration: 5000
                });
            }
        });
    };
}
