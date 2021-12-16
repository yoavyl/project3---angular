import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import CityModel from '../models/city.model';
import { citiesDownloadedAction } from '../redux/city-state';
import store from '../redux/store';
import { TimezoneService } from './timezone.service';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) { }

  // Get all cities: 
  public async getAllCities() {
    if (store.getState().cityState.cities.length === 0) {
        const cities = await this.http.get<CityModel[]>(environment.citiesUrl).toPromise();
        store.dispatch(citiesDownloadedAction(cities));
    }
    return store.getState().cityState.cities;

    }

}