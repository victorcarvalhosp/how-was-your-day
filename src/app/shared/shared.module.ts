import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ResponsiveAreaComponent} from './components/responsive-area/responsive-area.component';

@NgModule({
  declarations: [ResponsiveAreaComponent],
  imports: [
    CommonModule
  ],
  exports: [ResponsiveAreaComponent]
})
export class SharedModule { }
