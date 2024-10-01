import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../todos-list.component';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss'
})
export class TodoCardComponent {
  @Input()
  todoInput!: Todo; // "!" - означает что данные обязательно будут но по позже. 

  @Output()
  deleteTodoCard = new EventEmitter();
  
  onDeleteTodo(todoId: number) {
    this.deleteTodoCard.emit(todoId);
  }
}
