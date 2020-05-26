import { CurrentWeather } from './current-weather';
import { HourlyWeather } from './hourly-weather';
import { DailyWeather } from './daily-weather';

export class WeatherResponse {
    latitude: number;
    longitude: number;
    timezone: string;
    currently: CurrentWeather;
    hourly: HourlyWeather;
    daily: DailyWeather
}