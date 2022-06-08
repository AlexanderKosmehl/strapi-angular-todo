import { Component, OnInit } from '@angular/core';
import { Todo } from './Todo';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  todos: Todo[] = [];
  newTodo = '';

  constructor(private todoService: TodoService) {}

  addTodo() {
    if (!this.newTodo) return

    this.todoService.addTodo(this.newTodo).subscribe(() => {
      this.newTodo = ''
      this.updateTodos();
    });
  }

  finishTodo(todo: Todo) {
    todo.done = !todo.done

    this.todoService.updateTodo(todo).subscribe(() => {
      this.updateTodos()
    })
  }

  deleteFinishedTodos() {
    for (let todo of this.todos) {
      if (todo.done) {
        // Nix gut
        this.todoService.deleteTodo(todo.id).subscribe(() => {
          this.updateTodos()
        })
      }
    }
  }

  updateTodos() {
    this.todoService.getTodos().subscribe((todos) => (this.todos = todos));
  }

  ngOnInit(): void {
    this.updateTodos();
  }
}
