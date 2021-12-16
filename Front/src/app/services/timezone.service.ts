import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimezoneService {

  constructor() { }

  public convertTZ(date: Date | string) { // "Asia/Jerusalem"
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString(
        "en-US", {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone}));   
  }
}
