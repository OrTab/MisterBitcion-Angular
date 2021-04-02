import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BitcoinService } from 'src/app/services/bitcoin/bitcoin.service';

@Component({
  selector: 'statistic-page',
  templateUrl: './statistic-page.component.html',
  styleUrls: ['./statistic-page.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticPageComponent implements OnInit {
  @Input() isShowAll
  marketPrice
  transactionsPerDay
  marketPriceSubscription: Subscription
  transitionsSubscription: Subscription
  constructor(private bitcoinService: BitcoinService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.marketPriceSubscription = this.bitcoinService.getMarketPriceStat().subscribe(res => {
      const data = res.data.map(data => {
        data = Object.values(data)
        data[0] = new Date(data[0] * 1000).toLocaleDateString()
        return data
      })
      res.data = data
      this.marketPrice = res
      this.marketPrice.options = {
        hAxis: {
          title: 'Date'
        },
        vAxis: {
          title: 'USD'
        },
        chartArea: {
          backgroundColor: {
            fill: '#222222',
            fillOpacity: 0.9
          },
        gradient: {
            // Start color for gradient.
            color1: '#222222',
            // Finish color for gradient.
            color2: '#33b679',
            // Where on the boundary to start and
            // end the color1/color2 gradient,
            // relative to the upper left corner
            // of the boundary.
            x1: '0%', y1: '0%',
            x2: '100%', y2: '100%',
            // If true, the boundary for x1,
            // y1, x2, and y2 is the box. If
            // false, it's the entire chart.
            useObjectBoundingBoxUnits: true
          },

        }

      };
      // this.cd.markForCheck();
    })
    this.transitionsSubscription = this.bitcoinService.getTransactionsPerDay().subscribe(res => {
      const data = res.data.map(data => {
        data = Object.values(data)
        data[0] = `${new Date(data[0] * 1000).toLocaleDateString()}`
        return data
      })
      res.data = data
      this.transactionsPerDay = res
      this.transactionsPerDay.options = {
        hAxis: {
          title: 'Date'
        },
        vAxis: {
          title: 'Bitcoin transitions'
        }

      };
      // this.cd.markForCheck();
    })
  }


  ngOnDestroy() {
    this.marketPriceSubscription.unsubscribe()
    this.transitionsSubscription.unsubscribe()
  }

}
