import { Component, OnInit } from '@angular/core';
import { TodoService } from './services/todo.service';
import { Response } from '@angular/http';
import ToDo from './models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(

    private todoService: TodoService
  ) { }

  public newTodo: ToDo = new ToDo();

  todosList: ToDo[];
  editTodos: ToDo[] = [];

  ngOnInit(): void {

    this.todoService.getToDos()
    .subscribe(todos => {

      this.todosList = todos;
      console.log(todos);
    });
  }

  create() {
    this.todoService.createTodo(this.newTodo)
    .subscribe((res) => {
      this.todosList.push(res.data);
      this.newTodo = new ToDo();
    });
  }

  editTodo(todo: ToDo) {
    console.log(todo);
    if (this.todosList.includes(todo)) {
      if (!this.editTodos.includes(todo)) {
        this.editTodos.push(todo);
      } else {
        this.editTodos.splice(this.editTodos.indexOf(todo), 1);
        this.todoService.editToDo(todo).subscribe(res => {
          console.log('Successfully Updated');
        }, err => {
          this.editTodo(todo);
          console.error('Could Not Update');
        });
      }
    }
  }

  doneTodo(todo: ToDo) {
    todo.status = 'Done';
    this.todoService.editToDo(todo).subscribe(res => {
      console.log('Succesfully Updated');
    }, err => {
      this.editTodo(todo);
      console.error('Could Not Update');
    });
  }

  submitTodo(event, todo: ToDo) {
    if (event.keyCode === 13) {
      this.editTodo(todo);
    }
  }

  deleteTodo(todo: ToDo) {
    this.todoService.deleteTodo(todo._id).subscribe(res => {
      this.todosList.splice(this.todosList.indexOf(todo), 1);
    });
  }
}
