import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Contact } from 'src/app/services/contact/contact.model';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'contact-preview',
  templateUrl: './contact-preview.component.html',
  styleUrls: ['./contact-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactPreviewComponent implements OnInit {
  @Input() contact: Contact
  isLoad: boolean = false
  constructor(public utilService: UtilService) { }

  ngOnInit(): void {

  }

  load() {
    this.isLoad = true
  }

}
