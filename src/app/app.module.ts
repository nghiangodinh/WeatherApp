import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http"
import { HttpModule } from "@angular/http";
import { ChartModule } from 'angular2-highcharts';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ForecastPage, TabsPage, WeatherPage } from '../pages/pages';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppConstantsProvider } from '../providers/app-constants/app-constants';
import { WeatherServiceProvider } from '../providers/weather-service/weather-service';

const Highcharts = require('highcharts');

Highcharts.setOptions({
  colors: ['#50B432']
});

@NgModule({
  declarations: [
    MyApp,
    ForecastPage,
    TabsPage,
    WeatherPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ChartModule.forRoot(Highcharts),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ForecastPage,
    TabsPage,
    WeatherPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppConstantsProvider,
    WeatherServiceProvider
  ]
})
export class AppModule {}
