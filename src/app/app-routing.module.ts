import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './shared/guards/auth.guard';

const routes: Routes = [
  { path: 'activities', loadChildren: './activities/activities.module#ActivitiesModule', canActivate: [AuthGuard] },
  { path: 'home', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [AuthGuard] },
  {path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
  {path: '', loadChildren: './splash/splash.module#SplashModule'}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
