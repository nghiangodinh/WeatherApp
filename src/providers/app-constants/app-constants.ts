import { Injectable } from "@angular/core";

@Injectable()
export class AppConstantsProvider {
  googleApiURL: string;
  forecastURL: string;

  constructor() {
    this.googleApiURL = "https://maps.googleapis.com/maps/api/geocode/json?address=";
    this.forecastURL =  "https://api.darksky.net/forecast/edc44c37c9d6be3725f0f4d52f200eb9/";
  }

  getGoogleApiURL() {
    return this.googleApiURL;
  }

  getForecastURL() {
    return this.forecastURL;
  }
}
