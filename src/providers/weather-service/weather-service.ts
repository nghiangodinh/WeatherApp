import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppConstantsProvider } from "../app-constants/app-constants";

import "rxjs/add/operator/map";

@Injectable()
export class WeatherServiceProvider {
  public weatherURL: string;

  constructor(
    public http: HttpClient,
    private constantVar: AppConstantsProvider
  ) {
    this.weatherURL = this.constantVar.getForecastURL();
  }

  getCurrentWeather(longitude: any, latitude: any) {
    return this.http.get(this.weatherURL + latitude + "," + longitude);
  }

  getGeometry(googleApiURL: any, location: any) {
    return this.http.get(googleApiURL + "'" + location + "'");
  }
}
