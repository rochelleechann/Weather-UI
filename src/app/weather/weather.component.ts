import { Component, OnInit } from '@angular/core';
import { Location } from '../models/location';
import { WeatherService } from '../service/weather.service';
import { WeatherResponse } from '@models/weather/weather-response';
import * as moment from 'moment';
import { DailyWeather } from '@models/weather/daily-weather';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  currentFTemperature: number;
  currentCTemperature: number;
  currentSummary: string;
  convertTemperature = false;
  error: boolean;
  errorMessage: string;
  info: WeatherResponse;
  location: string;
  loadingTitle: string;
  pastDate: string;
  showLoader: boolean;
  submitted: boolean;
  submissionFailed = false;
  summary: string;
  sunrise: string;
  sunset: string;
  temperatureFMin: number;
  temperatureCMin: number;
  temperatureFMax: number;
  temperatureCMax: number;
  weatherForm: Location;
  windGust: number;
  windSpeed: number;
  todayDate: string;
  uvIndexTime: string;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.submitted = false;
    this.loadingTitle = "Loading weather"
    this.weatherForm = new Location ({
      city: '',
      state: ''
    });
  }

  submitForm(value: Location, validResponse: boolean): void {
    if (!validResponse) {
      this.error = true;
      return;
    } 
    this.showLoader = true;
    this.submitted = true;
    this.weatherForm = new Location({
      city: value.city,
      state: value.state
    })

    if (this.weatherForm.city.includes(" ")) {
      this.weatherForm.city = this.weatherForm.city.replace(' ', '+');
    }

    this.location = this.weatherForm.city + "+" + this.weatherForm.state;
    this.weatherService.getWeatherInformation(this.location).subscribe((data: WeatherResponse) => {
      setTimeout(() => {
        this.error = false;
        this.showLoader = false;
        this.todayDate = moment(new Date()).format('LL')
        this.pastDate = moment.unix(data.currently.time).format('LL');
        this.sunrise = moment.unix(data.daily.data[0].sunriseTime).format('LT');
        this.sunset = moment.unix(data.daily.data[0].sunsetTime).format('LT');
        this.uvIndexTime = moment.unix(data.daily.data[0].uvIndexTime).format('LT');

        // Celcius Temperature
        this.currentCTemperature = Math.round(data.currently.temperature);
        this.temperatureCMin = Math.round(data.daily.data[0].temperatureMin);
        this.temperatureCMax = Math.round(data.daily.data[0].temperatureMax);
        
        // Fahrenheit Temperature
        this.currentFTemperature = Math.round(data.currently.temperature * 9 / 5 + 32);
        this.temperatureFMin = Math.round(data.daily.data[0].temperatureMin * 9 / 5 + 32);
        this.temperatureFMax = Math.round(data.daily.data[0].temperatureMax * 9 / 5 + 32);
  
  
        this.summary = data.daily.data[0].summary;
        this.windSpeed = data.daily.data[0].windSpeed;
        this.windGust = data.daily.data[0].windGust;
      }, 3000)
    },
    (err: any) => {
      this.showLoader = false;
      this.submissionFailed = true;
      this.errorMessage = "Sorry, error getting weather information. Please try again."
      this.error = true;
    })
  }

  convertTemp(): void {
    this.convertTemperature = !this.convertTemperature;
  }

  reset() {
    this.weatherForm = new Location ({
      city: '',
      state: ''
    });
    this.submitted = false;
    this.error = false
  }
}
