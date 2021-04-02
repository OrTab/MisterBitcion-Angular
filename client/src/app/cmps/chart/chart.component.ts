import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})


export class ChartComponent implements OnInit {
  @Input() chartData
  type = 'LineChart'
  width = 550;
  height = 350;

  isLoad =false
  isDelay=false
  constructor() { }

  ngOnInit(): void { 
    console.log(this.chartData);
    
    setTimeout(()=>this.isDelay=true,1200)
  }
  
  load() {
      this.isLoad = true
  }

}
