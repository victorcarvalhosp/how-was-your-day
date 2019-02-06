import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './effects/auth.effects';
import {SigninComponent} from './pages/signin/signin.component';
import {StoreModule} from '@ngrx/store';
import {authReducer} from './reducers/auth.reducer';
import {RouterModule, Routes} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {ReactiveFormsModule} from '@angular/forms';
import {SignupComponent} from './pages/signup/signup.component';
import {ChooseComponent} from './pages/choose/choose.component';
import {SharedModule} from '../shared/shared.module';


export const authRoutes: Routes = [
    {
        path: '',
        component: ChooseComponent

    },
    {
        path: 'signin',
        component: SigninComponent

    },
    {
        path: 'signup',
        component: SignupComponent

    }
];

@NgModule({
    declarations: [SigninComponent, SignupComponent, ChooseComponent],
    imports: [
        IonicModule,
        ReactiveFormsModule,
        CommonModule,
        SharedModule,
        RouterModule.forChild(authRoutes),
        EffectsModule.forFeature([AuthEffects]),
        StoreModule.forFeature('auth', authReducer),

    ],
    exports: [SigninComponent]
})
export class AuthModule {
}
