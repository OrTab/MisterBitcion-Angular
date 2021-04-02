import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, delay, map, take, tap } from 'rxjs/operators';
import { EnvironmentUrlService } from '../environment-url.service';
import { Contact } from './contact.model';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials: true,
  }
  private stateContacts = []
  private _contacts$ = new BehaviorSubject(null)
  public contacts$ = this._contacts$.asObservable()

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) {
    this.loadContacts()
  }

  public loadContacts() {
    this.http.get(`${this.envUrl.url}contact`, this.httpOptions).subscribe(
      data => {
        this._contacts$.next(data)
        this.stateContacts = JSON.parse(JSON.stringify(data))
        catchError(this.handleError)
      })
  }

  public filterContacts(filterBy = null): void {
    let contacts = [...this.stateContacts]

    if (filterBy && filterBy.term) {
      contacts = this._filter(contacts, filterBy.term)
    }

    this._contacts$.next(contacts)
    // this._contacts$.next(this._sort(contacts))
  }


  public getContactById(id: string): Observable<Contact> {

    return this.http.get(`${this.envUrl.url}contact/${id}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  public deleteContact(id: string) {
    const contacts = this._contacts$.getValue().filter(contact => contact._id !== id)
    this._contacts$.next(contacts)
    return of()
  }

  public saveContact(contact, isAdd) {
    return isAdd ? this._addContact(contact) : this._updateContact(contact)
  }

  private _updateContact(contact: Contact) {
    const contacts = this._contacts$.getValue().map(c => contact._id === c._id ? contact : c)
    this._contacts$.next(contacts)
  }

  private _addContact(newContact: Contact) {

    console.log(newContact);
    this._contacts$.next([...this._contacts$.getValue(), newContact])
    // this._contacts$.next(this._sort(this._contacts))
  }

  private _sort(contacts: Contact[]): Contact[] {
    return contacts.sort((a, b) => {
      if (a.fullname.toLocaleLowerCase() < b.fullname.toLocaleLowerCase()) {
        return -1;
      }
      if (a.fullname.toLocaleLowerCase() > b.fullname.toLocaleLowerCase()) {
        return 1;
      }

      return 0;
    })
  }

  private _filter(contacts, term) {
    term = term.toLocaleLowerCase()
    return contacts.filter(contact => {
      return contact.fullname.toLocaleLowerCase().includes(term) ||
        contact.phone.toLocaleLowerCase().includes(term) ||
        contact.email.toLocaleLowerCase().includes(term)
    })

  }
  private handleError(error: HttpErrorResponse) {
    console.log('here');

    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {

      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return of(null)
  }
}