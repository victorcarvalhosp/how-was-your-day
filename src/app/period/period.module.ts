import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PeriodComponent} from './components/period.component';
import {DateFnsModule} from 'ngx-date-fns';
import {IonicModule} from '@ionic/angular';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {periodReducer} from './reducers/period.reducer';
import {PeriodEffects} from './effects/period.effects';

@NgModule({
  declarations: [PeriodComponent],
  imports: [
    IonicModule,
    CommonModule,
    DateFnsModule.forRoot(),
    EffectsModule.forFeature([PeriodEffects]),
    StoreModule.forFeature('period', periodReducer),
  ],
  exports: [PeriodComponent]
})
export class PeriodModule { }
