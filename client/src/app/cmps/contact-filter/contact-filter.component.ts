import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'contact-filter',
  templateUrl: './contact-filter.component.html',
  styleUrls: ['./contact-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactFilterComponent implements OnInit {
  filterBy = { term: '' }
  isShowFilters:boolean=false
  @Output() onFilter = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  setIsShowFilters(){
    this.isShowFilters=!this.isShowFilters
  }
  onSetFilter() {    
    this.onFilter.emit(this.filterBy)
  }

}
