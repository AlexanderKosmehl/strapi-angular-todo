import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Todo } from './Todo';

interface TodoResponse {
  data: {
    id: number;
    attributes: {
      text: string;
      done: boolean;
    };
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<TodoResponse>('http://localhost:1338/api/todos').pipe(
      map((response) => {
        return response.data.map((entry) => {
          return {
            id: entry.id,
            text: entry.attributes.text,
            done: entry.attributes.done,
          };
        });
      })
    );
  }

  addTodo(newTodoText: string) {
    const dto = {
      data: {
        text: newTodoText,
      },
    };

    return this.http.post('http://localhost:1338/api/todos', dto);
  }

  updateTodo(todo: Todo) {
    const dto = {
      data: {
        text: todo.text,
        done: todo.done,
      },
    };

    return this.http.put(`http://localhost:1338/api/todos/${todo.id}`, dto);
  }

  deleteTodo(id: number) {
    return this.http.delete(`http://localhost:1338/api/todos/${id}`)
  }
}
