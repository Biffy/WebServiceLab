import { Component, OnInit } from '@angular/core';
import {Todo} from '../todo';
import {TodoService} from '../todo.service';

@Component({
  selector: 'app-todo-app',
  templateUrl: './todo-app.component.html',
  styleUrls: ['./todo-app.component.css'],
  providers: [TodoService]
})
export class TodoAppComponent implements OnInit {

  newTodo: Todo = new Todo();

  // Ask Angular DI system to inject the dependency
  // associated with the dependency injection token `TodoService`
  // and assign it to a property called `todoService`
  constructor(private todoService: TodoService) { }

  addTodo() {
    this.todoService.addTodo(this.newTodo);
    this.newTodo = new Todo();
  }

  toggleTodoComplete(todo) {
    this.todoService.toggleTodoComplete(todo);
  }

  removeTodo(todo) {
    this.todoService.deleteTodoById(todo.id);
  }

  get todos() {
    return this.todoService.getAllTodos();
  }

  ngOnInit() {
  }
}

