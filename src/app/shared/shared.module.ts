import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ResponsiveAreaComponent} from './components/responsive-area/responsive-area.component';
import {IonicModule} from '@ionic/angular';
import {ConnectFormDirectiveDirective} from './forms/connect-form-directive.directive';

@NgModule({
  declarations: [ResponsiveAreaComponent, ConnectFormDirectiveDirective],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [ResponsiveAreaComponent, ConnectFormDirectiveDirective]
})
export class SharedModule { }
