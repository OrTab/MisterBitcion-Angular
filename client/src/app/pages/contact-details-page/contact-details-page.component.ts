import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/services/contact/contact.model';
import { UserService } from 'src/app/services/user/user.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'contact-details-page',
  templateUrl: './contact-details-page.component.html',
  styleUrls: ['./contact-details-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactDetailsPageComponent implements OnInit {
  contactSubscription: Subscription
  contact: Contact
  constructor(private route: ActivatedRoute, public utilService: UtilService, public userService: UserService) { }


  ngOnInit(): void {
    this.contactSubscription = this.route.data.subscribe(data => {
      this.contact = data.contact
    })
  }

  

  ngOnDestroy() {
    this.contactSubscription.unsubscribe()
  }

}
