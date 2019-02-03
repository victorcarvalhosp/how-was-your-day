import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OptionsPage} from './pages/options/options.page';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';


export const settingsRoutes: Routes = [
  {
    path: '',
    component: OptionsPage

  }
];
@NgModule({
  declarations: [OptionsPage],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(settingsRoutes),

  ],
  exports: [OptionsPage]
})
export class SettingsModule { }
