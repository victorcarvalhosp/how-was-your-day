import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {getInitialState, initialReducerMap, metaReducers} from './reducers';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {RouterStateSerializer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {CustomSerializer} from './shared/router/custom-router-state-serializer';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {ServiceWorkerModule} from '@angular/service-worker';
import {AuthEffects} from './auth/effects/auth.effects';
import {AngularFireFunctionsModule, FunctionsRegionToken} from '@angular/fire/functions';


@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        StoreModule.forRoot(initialReducerMap, {initialState: getInitialState, metaReducers}),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        EffectsModule.forRoot([AuthEffects]),
        StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFireFunctionsModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
    ],

    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouterStateSerializer, useClass: CustomSerializer},
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        { provide: FunctionsRegionToken, useValue: 'asia-northeast1' }

    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
