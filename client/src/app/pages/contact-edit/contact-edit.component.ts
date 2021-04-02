import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/services/contact/contact.model';
import { ContactService } from 'src/app/services/contact/contact.service';
import { User } from 'src/app/services/user/user.model';
import { UserService } from 'src/app/services/user/user.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactEditComponent implements OnInit {

  contactSubscription: Subscription
  title
  user: User
  msg: string = ''
  constructor(private route: ActivatedRoute, private userService: UserService,
    private router: Router, public utilService: UtilService) { }

  ngOnInit(): void {
    this.contactSubscription = this.route.data.subscribe(data => {
      console.log(data);

      this.user = data.user || { username: '', email: '', phone: '', fullname: '' }
    })
  }

  async onSubmitForm(formValue) {
    //make custom validator
    if (!formValue.fullname || !formValue.username || !formValue.email) {
      this.msg = 'All inputs required..'
      return
    }

    const res = await this.userService.updateUser({ ...this.user }).toPromise()
    if (!res) {
      this.msg = 'Something went wrong..please try again'
      return
    } else if (res === '401') {
      //sign up from session storage
      this.router.navigateByUrl('/login')
      return
    }
    this.msg = 'Saved Succesfuly..'
    setTimeout(() => {
      this.router.navigateByUrl('/profile')
      this.msg = ''
    }, 1500)
  }

  async onDeleteUser() {
    //  await  this.contactService.deleteContact(this.contact._id).toPromise()
    this.msg = 'Deleted Succesfuly..'
    setTimeout(() => {
      this.router.navigateByUrl('/contact')
      this.msg = ''
    }, 1500)
  }

  async uploadImg(ev) {
    if (!ev.target.files[0]) return
    if (!ev.target.files[0].type.includes('image')) {
      this.msg = 'File must be an image type'
      return
    }
    const res = await this.userService.uploadImg(ev.target.files[0]).toPromise()
    if (!res) this.msg = 'Something went wrong..please try again'
    else this.user.imgUrl = res.url

  }

  ngOnDestroy() {
    this.contactSubscription.unsubscribe()
  }
}

