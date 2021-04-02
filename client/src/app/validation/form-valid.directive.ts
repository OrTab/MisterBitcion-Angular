import { Directive } from '@angular/core';
import { FormControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[emailValid][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useValue: '',
      multi: true
    }
  ]

})
export class FormValidDirective {

  constructor() { }

  emailDomainValidator(control: FormControl) {
    const regex = /^(?:\d{10}|\w+@\w+\.\w{2,3})$/
    console.log(control);
    
    // const {name,email,phone}=control
  // if()
    
    }
  
  

}
