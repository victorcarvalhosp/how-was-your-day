import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SplashComponent} from './pages/splash/splash.component';
import {RouterModule, Routes} from '@angular/router';
import {authRoutes} from '../auth/auth.module';
import {IonicModule} from '@ionic/angular';


export const splashRoutes: Routes = [
    {
        path: '',
        component: SplashComponent

    }
];

@NgModule({
    declarations: [SplashComponent],
    imports: [
        IonicModule,
        CommonModule,
        RouterModule.forChild(splashRoutes),
    ],
    exports: [SplashComponent]
})
export class SplashModule {
}
