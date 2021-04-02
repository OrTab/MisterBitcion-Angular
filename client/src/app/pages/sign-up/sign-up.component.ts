import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnInit {
  msg: string = ''
  credentials = {
    fullname: '',
    username: '',
    password: '',
    email: '',
    phone: ''
  }

  constructor(private userService: UserService, private router: Router, private cd: ChangeDetectorRef) { }

  ngOnInit() {

  }

  async onSubmitForm(formValues) {
    if (!formValues.username || !formValues.fullname || !formValues.password || !formValues.email) {
      this.msg = 'Username | Fullname | Password | Email are all required..'
      return
    }
    const res = await this.userService.signUp(formValues).toPromise()
    if (res === '401') {
      this.msg = 'Invalid username or password..try again'
      this.cd.markForCheck();
    }
    else this.router.navigateByUrl('/')
  }


  ngOnDestroy() {
   
  }
}
