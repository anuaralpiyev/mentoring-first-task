import {Component, inject} from '@angular/core';
import {IUser} from "../../interfaces/iuser";
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-edit-user-form',
  standalone: true,
  imports: [
    NgIf,
    MatError,
    MatIcon,
    MatInput,
    MatLabel,
    MatSuffix,
    ReactiveFormsModule,
    MatFormField,
    MatButton,
    MatTooltip,
    MatDialogClose
  ],
  templateUrl: './edit-user-form.component.html',
  styleUrl: './edit-user-form.component.scss'
})
export class EditUserFormComponent {
  private readonly data: { user: IUser } = inject<{ user: IUser }>(MAT_DIALOG_DATA);

  public readonly dialogRef: MatDialogRef<IUser> = inject(MatDialogRef<EditUserFormComponent>);

  private fb: FormBuilder = inject(FormBuilder);

  public form = this.fb.group({
    name: [this.data.user.name, [Validators.required, Validators.minLength(3)]],
    email: [this.data.user.email, [Validators.required, Validators.email, Validators.minLength(3)]],
    phone: [this.data.user.phone, [Validators.required, Validators.minLength(5)]],
    website: [this.data.user.website, [Validators.required, Validators.minLength(5)]],
    company: this.fb.group({
      name: [this.data.user.company.name, [Validators.required, Validators.minLength(3)]]
    }),
  });

  submitForm(): void {
    this.dialogRef.close({...this.form.value, id: this.data.user.id});
  };
}
