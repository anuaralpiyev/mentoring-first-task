import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../users-list.component';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  @Input()
  userInput!: User; // "!" - означает что данные обязательно будут но по позже. 

  @Output()
  deleteUserCard = new EventEmitter();

  onDeleteUser(userId: number) {
    this.deleteUserCard.emit(userId);
  }
}
