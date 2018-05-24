import ToDo from '../models/todo.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class TodoService {

  api_url = 'http://localhost:3000';
  todoUrl = 'http://localhost:3000/api/todos';

  constructor(
    private http: HttpClient
  ) { }

  createTodo(todo: ToDo): Observable<any> {

    return this.http.post('${this.todoUrl}', todo);
  }

  getToDos(): Observable<ToDo[]> {
    return this.http.get(this.todoUrl)
    .map(res => {

      return res['data'].docs as ToDo[];
    });
  }

  editToDo(todo: ToDo) {
    // tslint:disable-next-line:prefer-const
    let editUrl = '${this.todoUrl}';
    return this.http.put(editUrl, todo);
  }

  deleteTodo(id: string): any {

    // tslint:disable-next-line:prefer-const
    let deleteUrl = '${this.todoUrl}/${id}';
    return this.http.delete(deleteUrl)
    .map(res => {
      return res;
    });
  }

  private handleError(error: any): Promise<any> {
    console.error('Error Occurred', error);
    return Promise.reject(error.message || error);
  }
}
