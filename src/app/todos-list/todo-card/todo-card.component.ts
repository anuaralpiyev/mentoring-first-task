import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss'
})
export class TodoCardComponent {
  @Input()
  todoInput: any;

  @Output()
  deleteTodoCard = new EventEmitter();
  
  onDeleteTodo(todoId: number) {
    this.deleteTodoCard.emit(todoId);
  }
}
