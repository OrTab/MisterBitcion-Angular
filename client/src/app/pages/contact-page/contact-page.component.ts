import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Contact } from 'src/app/services/contact/contact.model';
import { ContactService } from 'src/app/services/contact/contact.service';

@Component({
  selector: 'contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactPageComponent implements OnInit {
  contacts 
  sub:Subscription

  constructor(private contactService: ContactService,private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    // this.contactService.loadContacts()
    this.sub=this.contactService.contacts$.subscribe(contacts=>{ 
      console.log(contacts); 
      this.contacts=contacts
      this.cd.markForCheck()
    })
  }


  onSetFilter(filter) {
   this.contactService.filterContacts(filter)
  }


  ngOnDestroy() {
  this.sub.unsubscribe()
  }

}
