import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/services/user/user.model';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'transfer-fund',
  templateUrl: './transfer-fund.component.html',
  styleUrls: ['./transfer-fund.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransferFundComponent implements OnInit {
  amount: number
  user: User
  subscription: Subscription
  msg: string
  @Input() contact
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.subscription = this.userService.user$.subscribe(user => this.user = user)
  }


  onFormSubmit(formValue) {
    if (formValue.amount > this.user.coins) {
      this.msg = 'oops too poor'
      return
    }
    this.userService.onTransferCoins(formValue.amount, this.contact)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
