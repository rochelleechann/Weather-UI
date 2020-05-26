import { Injectable } from '@angular/core';
import { HttpClientService } from './httpclient.service';
import { Observable } from 'rxjs';

@Injectable()
export class WeatherService {
  data: any;
  error: string;
  constructor(private httpClientService: HttpClientService) {}

  // tslint:disable-next-line
  getWeatherInformation(location: string): Observable<any> {
    const url = `https://us-central1-weather-app-277816.cloudfunctions.net/weather-info?location=${location}`;
    console.log("this is the url:", url);

    return new Observable((observer: any) => {
      this.httpClientService.get(url, false).subscribe((response: any) => {
        console.log('Response from getWeatherInformation', response)
        observer.next(response);
        observer.complete();
      },
      (err: any) => {
        if (err.status === 500) {
          observer.next('Not found');
          observer.complete();
        } else {
          observer.error(err);
        }
      })
    })
  }
}
