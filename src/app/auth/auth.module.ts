import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './effects/auth.effects';
import {SigninComponent} from './pages/signin/signin.component';
import {StoreModule} from '@ngrx/store';
import {reducer} from './reducers/auth.reducer';
import {RouterModule, Routes} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {ReactiveFormsModule} from '@angular/forms';
import {AngularFireAuthModule} from '@angular/fire/auth';


export const authRoutes: Routes = [
    {
        path: '',
        component: SigninComponent

    }
];

@NgModule({
    declarations: [SigninComponent],
    imports: [
        IonicModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule.forChild(authRoutes),
        EffectsModule.forFeature([AuthEffects]),
        StoreModule.forFeature('auth', reducer),

    ]
})
export class AuthModule {
}
