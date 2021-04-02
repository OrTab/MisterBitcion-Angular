import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { Contact } from './contact.model';
import { ContactService } from './contact.service';

@Injectable({
  providedIn: 'root'
})
export class ContactResolverService implements Resolve<Observable<Contact | User>>{

  constructor(private contactService: ContactService, private userService: UserService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Contact | User> {
    const { id } = route.params

    if (route.routeConfig.path.includes('profile')) {
      let user
      const sub = this.userService.user$.subscribe(userToReturn => {     
        user = userToReturn
      })
      sub.unsubscribe()
      return user
    }
    else return this.contactService.getContactById(id)
  }
}
