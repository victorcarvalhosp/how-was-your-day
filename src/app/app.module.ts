import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {reducers, metaReducers} from './reducers';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {RouterStateSerializer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {CustomSerializer} from './shared/router/custom-router-state-serializer';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        StoreModule.forRoot(reducers, {metaReducers}),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        EffectsModule.forRoot([]),
        StoreRouterConnectingModule.forRoot({stateKey: 'router'})],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: RouterStateSerializer, useClass: CustomSerializer },
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
