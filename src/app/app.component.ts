import { Component } from '@angular/core';
import { WeatherService } from './weather.service';

import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common'; // <-- імпорт

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, FormsModule], // <-- додати сюди CommonModule
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'weather-app';

  city: string = '';
  weather: any = null;
  error: string | null = null;

  constructor(private weatherService: WeatherService) {}

  fetchWeather() {
    this.error = null;
    this.weather = null;

    if (!this.city.trim()) {
      this.error = 'Please enter the name of the city';
      return;
    }

    this.weatherService.getWeather(this.city.trim()).subscribe({
      next: (data) => {
        this.weather = data;
      },
      error: (err) => {
        this.error = 'Could not get the weather. Check the city name and try again.';
        console.error(err);
      }
    });
  }
}
