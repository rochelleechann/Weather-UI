import { Component, OnInit } from '@angular/core';
import { Location } from '../models/location';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  city: string;
  state: string;
  submitted: boolean;

  constructor() { }

  ngOnInit(): void {
    this.submitted = false;
  }

  submit(value: Location): void {
    this.submitted = true;
    this.city = value.city;
    this.state = value.state;
  }
}
