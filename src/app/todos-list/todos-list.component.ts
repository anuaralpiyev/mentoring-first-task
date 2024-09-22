import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TodoCardComponent } from './todo-card/todo-card.component';
import { TodoApiService } from '../todos-api.service';

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-todos-list',
  standalone: true,
  imports: [NgFor, TodoCardComponent],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss',
})
export class TodosListComponent {
  readonly todoApiService = inject(TodoApiService);
  todos: Todo[] = [];

  constructor() {
    this.todoApiService.getTodos().subscribe((response: any) => {
      this.todos = response;
    });
  }
  deleteTodoList(id: any) {
    this.todos = this.todos.filter((item) => item.id !== id);
  }
}
