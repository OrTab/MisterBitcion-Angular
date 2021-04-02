import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BitcoinService } from 'src/app/services/bitcoin/bitcoin.service';
import { User } from 'src/app/services/user/user.model';
import { UserService } from 'src/app/services/user/user.service';



@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit {
  user: User
  userBitcoinValue
  userSubscription: Subscription
  bitcionRateSubscription: Subscription

  constructor(private userService: UserService, private bitcionService: BitcoinService,
    private cd: ChangeDetectorRef, private router: Router) { }


  ngOnInit(): void {
    this.userSubscription = this.userService.user$.subscribe((user) => {
      this.user = user
      if (!user) {
        this.router.navigateByUrl('/login')
        return
      }
      if (user) {
        this.bitcionRateSubscription = this.bitcionService.getRate(user.coins).subscribe((bitcionValue) => {
          this.userBitcoinValue = bitcionValue
          this.cd.markForCheck();
        })
      }
    })
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe()
    this.bitcionRateSubscription?.unsubscribe()
  }

}
