import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private http: HttpClient) { }


  public getNameInitials(name) {
    name = name.split(' ');
    const newName = name.map(word => word[0]).join('').toUpperCase();
    return newName;

  }


}
