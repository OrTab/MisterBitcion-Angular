import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/services/user/user.model';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  sub: Subscription
  user: User
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {  
    this.sub = this.route.data.subscribe(data =>{ 
      this.user = data.user
    } )
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

}
