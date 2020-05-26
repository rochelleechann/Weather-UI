import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Components
import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';

// Services
import { HttpClientService } from './service/httpclient.service';
import { WeatherService } from './service/weather.service';
import { OverlayLoaderComponent } from './overlay-loader/overlay-loader.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    OverlayLoaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [HttpClientService, WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
