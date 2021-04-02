import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Contact } from 'src/app/services/contact/contact.model';

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactListComponent implements OnInit {
  @Input() contacts: Contact[] = []
  constructor() { }

  ngOnInit(): void {
    
  }

}
