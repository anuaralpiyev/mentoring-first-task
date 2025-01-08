import { Component, inject } from '@angular/core';
import { MatDialogClose, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatFormField } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { NgIf } from "@angular/common";
import { MyErrorEstateMatcher } from "../../utils/error-estate-matcher";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltip } from "@angular/material/tooltip";

@Component({
    selector: 'app-create-user-form',
    standalone: true,
    imports: [
        MatFormField,
        MatInputModule,
        ReactiveFormsModule,
        NgIf,
        MatIconModule,
        MatButtonModule,
        MatTooltip,
        MatDialogClose],
    templateUrl: './create-user-form.component.html',
    styleUrl: './create-user-form.component.scss'
})
export class CreateUserFormComponent {
    public readonly dialogRef: MatDialogRef<CreateUserFormComponent> = inject(MatDialogRef<CreateUserFormComponent>);
    public fb: FormBuilder = inject(FormBuilder);

    public form = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-za-z]+$/)]],
        email: ['', [Validators.required, Validators.email, Validators.minLength(3)]],
        phone: ['', [Validators.required, Validators.minLength(5), Validators.pattern(/^[0-9]+$/)]],
        website: ['', [Validators.required, Validators.minLength(5)]],
        company: this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
        }),
    });

    submitForm() {
        this.dialogRef.close(this.form.value)
    }
}
