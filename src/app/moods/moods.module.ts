import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MoodsComponent} from './pages/moods.component';
import {IonicModule} from '@ionic/angular';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {MoodsEffects} from './effects/moods.effects';
import {moodsReducer} from './reducers/moods.reducer';
import {CreateMoodComponent} from './pages/create-mood/create-mood.component';
import { MoodIconPipe } from './pipes/mood-icon.pipe';

export const moodsRoutes: Routes = [
  {
    path: '',
    component: MoodsComponent

  },
  {
    path: 'create',
    component: CreateMoodComponent
  }
];
@NgModule({
  declarations: [MoodsComponent, CreateMoodComponent, MoodIconPipe],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    RouterModule.forChild(moodsRoutes),
    EffectsModule.forFeature([MoodsEffects]),
    StoreModule.forFeature('moods', moodsReducer),
  ]
})
export class MoodsModule { }
