import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Tab2Page} from './tab2.page';
import {PeriodModule} from '../period/period.module';
import {ChartsModule} from 'ng2-charts';
import {SharedModule} from '../shared/shared.module';
import {MoodsPipesModule} from '../moods/pipes/moods-pipes.module';
import {ActivitiesPipesModule} from '../activities/pipes/activities-pipes.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PeriodModule,
    ChartsModule,
    SharedModule,
    MoodsPipesModule,
    ActivitiesPipesModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }])
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule {

}
