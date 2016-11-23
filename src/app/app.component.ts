//Imports
import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx'

import {Todo} from '../todo';
import {TodoService} from '../todo.service'

@Component({
  selector: 'app-todo-app',
  templateUrl: './todo-app.component.html',
  styleUrls: ['./todo-app.component.css'],
  providers: [TodoService]
})
export class TodoAppComponent implements OnInit {
  //these will be used to subscribe ot the Observable collection
  todos: Observable<Todo[]>;
  singleTodo$: Observable<Todo>;

  newTodo: Todo = new Todo();

  constructor(private todoService: TodoSevice)
}

//Initialise component 
ngOnInit() {
  //Subscribe to the observable collection
  this.todos = this.todoService.todos;

  //Subscribe to only one todo
  this.singleTodo$ = this.todoService.todos
                          .map(todos => todos.find(item => item.id === '1'));
  
  //load all todos
  this.todoService.loadAll();

  //load only todo with id of '1'
  this.todoService.load('1');
}

addTodo() {
  //set date and convert to correct format
  this.newTodo.createdAt = new Date().toJSON();

  //Pass to service to create
  this.todoService.create(this.newTodo);

  //Cretae a newTodo - required as old object will still be bound
  this.newTodo = new Todo();

}

  //Call service to set complete true or false
  toggleTodoComplete(todo) {
    this.todoService.toggleTodoComplete(todo);
  }

  //Call Delete
  deleteTodo(todoId: number) {
    this.todoService.remove(todoId);
  }
