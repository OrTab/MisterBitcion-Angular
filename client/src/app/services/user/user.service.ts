import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { ContactService } from '../contact/contact.service';
import { EnvironmentUrlService } from '../environment-url.service';
import { storageService } from '../storageService';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    withCredentials: true,
  }

  private _user$ = new BehaviorSubject(storageService.load('loggedInUser'))
  public user$ = this._user$.asObservable()

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService,
    private contactService: ContactService, private router: Router) { }

  public checkLogin(credentials): Observable<{}> {

    return this.http.post(`${this.envUrl.url}auth/login`, credentials, this.httpOptions)
      .pipe(
        map(data => {
          this.saveloggedInUser(data)
          return data
        }),
        delay(1200),
        catchError(this.handleError)
      )
  }

  public signUp(credentials): Observable<{}> {

    return this.http.post(`${this.envUrl.url}auth/signup`, credentials, this.httpOptions)
      .pipe(
        map(data => {
          this.saveloggedInUser(data)
          return data
        }),
        delay(1200),
        catchError(this.handleError)
      )
  }

  public logOut() {
    this.http.post(`${this.envUrl.url}auth/logout`, this.httpOptions)
      .subscribe(
        data => {
          storageService.clear()
          this.router.navigateByUrl('/login')
          this._user$.next(null)
        },
        catchError(this.handleError)
      )
  }

  public updateUser(user: User) {
    return this.http.put(`${this.envUrl.url}user/${user._id}`, user, this.httpOptions)
      .pipe(
        map(data => {
          this.saveloggedInUser(data)
          this.contactService.saveContact(data, false)
          return data
        }),
        catchError(this.handleError)
      )
  }

  public onTransferCoins(amount, contact) {

    const move = {
      toId: contact._id,
      to: contact.fullname,
      at: Date.now(),
      amount
    }
    return this.http.put(`${this.envUrl.url}user/transfer`, move, this.httpOptions)
      .subscribe(
        data => {
          const users = JSON.parse(JSON.stringify(data))
          this.saveloggedInUser(users.userToSave)
          this.contactService.saveContact(users.contactToSave, false)
          return data
        },
        catchError(this.handleError)
      )

  }

  private saveloggedInUser(user) {
    storageService.store('loggedInUser', user)
    this._user$.next(user)
  }


  public uploadImg(url) {
    console.log(url);

    const CLOUD_NAME = "dptiv4ajc"
    const UPLOAD_PRESET = "rolpcssu"
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

    const formData = new FormData();
    formData.append('file', url)
    formData.append('upload_preset', UPLOAD_PRESET);
    return this.http.post(`${UPLOAD_URL}`, formData)
      .pipe(
        catchError(this.handleError)
      )

  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {

      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }


    return error.status === 401 ? of('401') : of(null)
  }
}
