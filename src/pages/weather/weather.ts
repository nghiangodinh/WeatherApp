import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { AppConstantsProvider } from "../../providers/app-constants/app-constants";
import { WeatherServiceProvider } from "../../providers/weather-service/weather-service";

@Component({
  selector: "page-weather",
  templateUrl: "weather.html"
})
export class WeatherPage {
  weatherForm: FormGroup;
  weatherResult: boolean;
  summaryIcon: string;

  private geometry: any;
  private currentWeather: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fb: FormBuilder,
    private appConstants: AppConstantsProvider,
    private weatherService: WeatherServiceProvider
  ) {
    this.weatherForm = fb.group({
      location: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("[a-zA-Z, ]*"),
          Validators.minLength(3),
          Validators.maxLength(100)
        ])
      ]
    });

    this.geometry = { longitude: "", latitude: "" };
    this.currentWeather = {};
    this.weatherResult = false;
    this.summaryIcon = "";
  }

  getWeather(formData: any) {
    this.weatherService.getGeometry(
      this.appConstants.getGoogleApiURL(),
      formData.value.location
    ).subscribe((data: any) => {
      this.geometry.longitude = data.results[0].geometry.location.lng;
      this.geometry.latitude = data.results[0].geometry.location.lat;
      this.weatherService.getCurrentWeather(
        this.geometry.longitude,
        this.geometry.latitude
      ).subscribe((weatherData: any) => {
        this.currentWeather = weatherData.currently;
        this.weatherResult = true;

        if (this.currentWeather.summary.toLowerCase().indexOf("cloudy") > 0)
          this.summaryIcon = "cloudy";
        else if (this.currentWeather.summary.toLowerCase().indexOf("rainy") > 0)
          this.summaryIcon = "rainy";
        else if (this.currentWeather.summary.toLowerCase().indexOf("sunny") > 0)
          this.summaryIcon = "sunny";
        else if (
          this.currentWeather.summary.toLowerCase().indexOf("thunderstorm") > 0
        )

        this.summaryIcon = "thunderstorm";
      },
      err => {
        console.log("Could not get weather info:  ", err);
      });
    });
  }
}
