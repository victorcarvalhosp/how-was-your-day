import {Directive, Input} from '@angular/core';
import {FormGroupDirective} from '@angular/forms';

@Directive({
  selector: '[appConnectForm]'
})
export class ConnectFormDirectiveDirective {

    @Input('appConnectForm')
    set data(val: any) {
        if (val) {
            this.formGroupDirective.form.patchValue(val);
            this.formGroupDirective.form.markAsPristine();
        }
    }
    constructor(private formGroupDirective: FormGroupDirective) {}

}
