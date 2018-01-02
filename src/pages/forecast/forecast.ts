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
  selector: "page-forecast",
  templateUrl: "forecast.html"
})
export class ForecastPage {
  forecastForm: FormGroup;
  weatherServiceResult: boolean;
  summaryIcon: string;
  chartValue: {};

  //private appConstants: any;
  //private weatherService: any;
  private geometry: any;
  private minweatherService: number[][];
  private maxweatherService: number[][];
  private weatherServiceTime: any;

  constructor(
    private navController: NavController,
    private fb: FormBuilder,
    private appConstants: AppConstantsProvider,
    private weatherService: WeatherServiceProvider
  ) {
    this.forecastForm = fb.group({
      location: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("[a-zA-Z, ]*"),
          Validators.minLength(3),
          Validators.maxLength(100)
        ])
      ],
      forecastType: "daily"
    });
    //this.appConstants = appConstants;
    //this.weatherService = weatherServiceApi;
    this.geometry = { longitude: "", latitude: "" };
    this.minweatherService = new Array();
    this.maxweatherService = new Array();
    this.weatherServiceTime = new Array();
    this.weatherServiceResult = false;
    this.summaryIcon = "";
  }

  filterJson(json, forecastType) {
    this.minweatherService = new Array();
    this.maxweatherService = new Array();
    this.weatherServiceTime = new Array();

    for (var i = 0; i < json.length; i++) {
      var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
      var b: Date = new Date(json[i].time * 1000);
      if (forecastType == "daily") {
        this.weatherServiceTime.push(
          b.getDate() + " " + months[b.getMonth()] + " " + b.getFullYear()
        );
        this.maxweatherService.push(json[i].temperatureMax);
        this.minweatherService.push(json[i].temperatureMin);
      } else {
        this.weatherServiceTime.push(
          b.getDate() +
            " " +
            months[b.getMonth()] +
            " " +
            b.getFullYear() +
            "- " +
            b.getHours() +
            " hours"
        );
        this.minweatherService.push(json[i].temperature);
      }
    }
  }

  getForecast(formData: any) {
    this.weatherService
      .getGeometry(this.appConstants.getGoogleApiURL(), formData.value.location)
      .subscribe((data: any) => {
        this.geometry.longitude = data.results[0].geometry.location.lng;
        this.geometry.latitude = data.results[0].geometry.location.lat;

        this.weatherService.getCurrentWeather(
            this.geometry.longitude,
            this.geometry.latitude
          )
          .subscribe((weatherServiceData: any) => {
            this.weatherServiceResult = true;
            if (formData.value.forecastType == "daily") {
              this.filterJson(
                weatherServiceData.daily.data,
                formData.value.forecastType
              );
              this.chartValue = {
                title: { text: "Weather Forecast" },
                chart: { type: "column" },
                xAxis: {
                  categories: this.weatherServiceTime
                },
                series: [
                  { name: "Min Temp", data: this.minweatherService },
                  { name: "Max Temp", data: this.maxweatherService }
                ]
              };
            } else {
              this.filterJson(
                weatherServiceData.hourly.data,
                formData.value.forecastType
              );
              this.chartValue = {
                title: { text: "weatherService Forecast" },
                chart: { type: "column" },
                xAxis: {
                  categories: this.weatherServiceTime
                },
                series: [{ name: "Min Temp", data: this.minweatherService }]
              };
            }
          });
      });
  }
}
