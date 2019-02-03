import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ResponsiveAreaComponent} from './components/responsive-area/responsive-area.component';
import {IonicModule} from '@ionic/angular';

@NgModule({
  declarations: [ResponsiveAreaComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [ResponsiveAreaComponent]
})
export class SharedModule { }
