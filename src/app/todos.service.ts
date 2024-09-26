import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from './todos-list/todos-list.component';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private todosSubject$ = new BehaviorSubject<Todo[]>([]);
  // <Todo[]> - (<> дженрик тип) данных Todo[], озночает теперь в коробочке будет лежать Todo.
  todos$ = this.todosSubject$.asObservable();

  //*Установка todos
  setTodos(todos: Todo[]) {
    // можно писать Array<Todo> или так Todo[] смысл один и тот же.
    this.todosSubject$.next(todos);
  }

  //* Изменение todo
  editTodo(editTodo: Todo) {
    this.todosSubject$.next(
      this.todosSubject$.value.map((todo) => {
        if (todo.id === editTodo.id) {
          return editTodo;
        } else {
          return todo;
        }
      })
    );
  }

  //* Создаем todo
  createTodo(todo: Todo) {
    this.todosSubject$.next([...this.todosSubject$.value, todo]);
    // spreadOperation ... работает с объектами
    // restOperation ... работает с массивами
  }

  //*Удаляем todo
  deleteTodo(id: number) {
    this.todosSubject$.next(
      this.todosSubject$.value.filter((item) => id !== item.id)
    );
  }
}
