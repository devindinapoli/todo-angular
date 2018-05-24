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

  ngOnInit(): void {

    this.todoService.getToDos()
    .subscribe(todos => {

      this.todosList = todos;
      console.log(todos);
    });
  }
}
