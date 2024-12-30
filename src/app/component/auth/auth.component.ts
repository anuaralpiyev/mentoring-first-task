import { Component } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { MatDialogClose } from "@angular/material/dialog";
import { ShadowDirective } from "../directives/shadow.directive";
import { MatTooltip } from "@angular/material/tooltip";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    MatButton,
    MatDialogClose,
    ShadowDirective,
    MatTooltip,
    MatIcon
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

}
