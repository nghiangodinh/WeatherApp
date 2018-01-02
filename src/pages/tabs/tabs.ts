import { Component } from "@angular/core";
import { ForecastPage, WeatherPage } from "../pages";

@Component({
  templateUrl: "tabs.html"
})
export class TabsPage {
  weatherPage = WeatherPage;
  forecastPage = ForecastPage;

  constructor() {}
}
