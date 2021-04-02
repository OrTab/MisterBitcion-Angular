import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  credentials = {
    username: '',
    password: ''
  }
  msg = ''

  constructor(private userService: UserService, private router: Router, private cd: ChangeDetectorRef) { }
  ngOnInit(): void {
  }

  async onSubmitForm(formValues) {
    const res = await this.userService.checkLogin(formValues).toPromise()
    console.log(res);
    if (res === '401') {
      this.msg = 'Invalid username or password..try again'
      this.cd.markForCheck();
    }
    else this.router.navigateByUrl('/')
  }


  ngOnDestroy() {
   
  }

}
