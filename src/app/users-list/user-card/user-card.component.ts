import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  @Input()
  userInput: any;

  @Output()
  deleteUserCard = new EventEmitter();

  onDeleteUser(userId: number) {
    this.deleteUserCard.emit(userId);
  }
}
